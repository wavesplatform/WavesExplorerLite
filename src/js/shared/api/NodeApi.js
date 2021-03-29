import axios from 'axios';
import * as rax from 'retry-axios';
import json from 'json-bigint';

import DateTime from '../DateTime';
import Strings from '../Strings';
import {
    data,
    fetchBalanceDetails,
    fetchScriptInfo,
    fetchScriptInfoMeta,
    fetchValidate
} from "@waves/node-api-js/cjs/api-node/addresses";
import {fetchByAddress} from "@waves/node-api-js/cjs/api-node/alias";
import {fetchNodeVersion} from "@waves/node-api-js/cjs/api-node/node";
import {fetchBasetarget} from "@waves/node-api-js/cjs/api-node/consensus";
import {
    fetchInfo,
    fetchStatus,
    fetchUnconfirmed,
    fetchUnconfirmedSize
} from "@waves/node-api-js/cjs/api-node/transactions";
import {
    BlockAt,
    fetchDelay, fetchHeadersAt,
    fetchHeadersLast, fetchHeadersSeq,
    fetchHeight,
    fetchHeightById
} from "@waves/node-api-js/cjs/api-node/blocks";

const TRANSACTIONS_BY_ADDRESS_LIMIT = 100;
const ASSETS_PER_PAGE = 100;

const parseResponse = (response) => {
    if (typeof response === 'string') {
        try {
            return json.parse(response);
        } catch (e) {
            // ignore
        }
    }

    return response;
};

const DEFAULT_AXIOS_CONFIG = {
    transformResponse: [parseResponse],
};

const CUSTOM_AXIOS_CONFIG = {
    withCredentials: true,
    headers: {
        common: {
            ['Cache-Control']: 'no-cache'
        }
    }
};

const buildAxiosConfig = useCustomRequestConfig => {
    let result = DEFAULT_AXIOS_CONFIG;
    if (useCustomRequestConfig)
        result = Object.assign({}, result, CUSTOM_AXIOS_CONFIG);

    return result;
};

const buildRetryableAxiosConfig = axiosInstance => ({
    instance: axiosInstance,
    retryDelay: 100,
    retry: 5,
    httpMethodsToRetry: ['GET'],
    shouldRetry: shouldRetryRequest
});

export const replaceTimestampWithDateTime = obj => {
    if (obj.timestamp) {
        obj.timestamp = new DateTime(obj.timestamp);
    }

    return obj;
};

const transformTimestampToDateTime = (responseData) => {
    if (Array.isArray(responseData)) {
        responseData.forEach(replaceTimestampWithDateTime);
    } else {
        replaceTimestampWithDateTime(responseData);
    }

    return responseData;
};

/**
 * Determine based on config if we should retry the request.
 * @param err The AxiosError passed to the interceptor.
 */
function shouldRetryRequest(err) {
    const config = err.config.raxConfig;

    // If there's no config, or retries are disabled, return.
    if (!config || config.retry === 0) {
        return false;
    }

    config.currentRetryAttempt = config.currentRetryAttempt || 0;

    // Check if this error has no response (ETIMEDOUT, ENOTFOUND, etc)
    if (!err.response && (config.currentRetryAttempt >= config.noResponseRetries)) {
        return false;
    }

    // Only retry with configured HttpMethods.
    const methodsToRetry = Array.isArray(config.httpMethodsToRetry) ?
        config.httpMethodsToRetry :
        Object.values(config.httpMethodsToRetry);
    if (!err.config.method ||
        methodsToRetry.indexOf(err.config.method.toUpperCase()) < 0) {
        return false;
    }

    // If this wasn't in the list of status codes where we want
    // to automatically retry, return.
    if (err.response && err.response.status) {
        let isInRange = false;
        for (const [min, max] of config.statusCodesToRetry) {
            const status = err.response.status;
            if (status >= min && status <= max) {
                isInRange = true;
                break;
            }
        }
        if (!isInRange) {
            return false;
        }
    }

    // If we are out of retry attempts, return
    if (config.currentRetryAttempt >= config.retry) {
        return false;
    }

    return true;
}

export const nodeApi = (baseUrl, useCustomRequestConfig) => {
    const trimmedUrl = Strings.trimEnd(baseUrl, '/');
    const config = buildAxiosConfig(useCustomRequestConfig);
    const nodeAxios = axios.create(config);
    const get = (url, config) => nodeAxios.get(trimmedUrl + url, config);

    const retryableAxios = axios.create(config);
    retryableAxios.defaults.raxConfig = buildRetryableAxiosConfig(retryableAxios);
    rax.attach(retryableAxios);
    const retryableGet = (url, config) => retryableAxios.get(trimmedUrl + url, config);

    return {
        version: () => fetchNodeVersion(baseUrl),
        baseTarget: () => fetchBasetarget(baseUrl),
        addresses: {
            details: (address) => fetchBalanceDetails(baseUrl, address),
            aliases: (address) => fetchByAddress(baseUrl, address).then(response => ({data: response})),
            validate: (address) => fetchValidate(baseUrl, address).then(response => ({data: response})),
            data: (address) => data(baseUrl, address).then(response => ({data: response})),
            scriptInfo: (address) => fetchScriptInfo(baseUrl, address).then(response => ({data: response})),
            scriptMeta: (address) => fetchScriptInfoMeta(baseUrl, address).then(response => ({data: response}))
        },
        blocks: {
            height: () => fetchHeight(baseUrl),
            heightBySignature: (id) => fetchHeightById(baseUrl, id),
            delay: (id, blockNum) => fetchDelay(baseUrl, id, blockNum),
            at: (height) => BlockAt(baseUrl, height).then(response => transformTimestampToDateTime(response)),
            headers: {
                last: () => fetchHeadersLast(baseUrl).then(response => transformTimestampToDateTime(response)),
                at: (height) => fetchHeadersAt(baseUrl, height).then(response => transformTimestampToDateTime(response)),
                sequence: (from, to) => fetchHeadersSeq(baseUrl, from, to).then(response => transformTimestampToDateTime(response)),
            },
        },
        transactions: {
            unconfirmed: () => retryableGet('/transactions/unconfirmed'),
            utxSize: () => fetchUnconfirmedSize(baseUrl),
            info: id => fetchInfo(baseUrl, id).then(response => ({
                data: response
            })),
            status: async idsArray => {
                const limit = 1000;
                let subarray = [];
                for (let i = 0; i < Math.ceil(idsArray.length / limit); i++) {
                    subarray[i] = idsArray.slice((i * limit), (i * limit) + limit);
                }

                const res = await Promise.all(
                    subarray.map(async (ids) =>
                        (await axios.post('/transactions/status', {ids}, {baseURL: baseUrl})).data)
                );

                return [].concat(...res)
            },
            address: (address, limit, after) => {
                const top = limit || TRANSACTIONS_BY_ADDRESS_LIMIT;
                const config = after ? {
                    params: {
                        after
                    }
                } : undefined;

                return retryableGet(`/transactions/address/${address}/limit/${top}`, config);
            },
            stateChanges: id => retryableGet(`/debug/stateChanges/info/${id}`)
        },
        aliases: {
            address: (alias) => retryableGet(`/alias/by-alias/${alias}`)
        },
        assets: {
            balance: (address) => retryableGet(`/assets/balance/${address}`),
            details: (assetId, full) => retryableGet(`/assets/details/${assetId}`, {
                params: {
                    full: !!full
                }
            }),
            detailsMultiple: async idsArray => {
                const limit = 1000;
                let subarray = [];
                for (let i = 0; i < Math.ceil(idsArray.length / limit); i++) {
                    subarray[i] = idsArray.slice((i * limit), (i * limit) + limit);
                }

                const res = await Promise.all(
                    subarray.map(async (ids) =>
                        (await axios.post('/assets/details', {ids}, {baseURL: baseUrl})).data)
                );

                return [].concat(...res)
            },
            nft: (address, limit, after) => {
                const top = limit || ASSETS_PER_PAGE;
                const config = after ? {
                    params: {
                        after
                    }
                } : undefined;

                return retryableGet(`/assets/nft/${address}/limit/${top}`, config);
            }
        },
        peers: () => retryableGet('/peers/connected'),
    };
};
