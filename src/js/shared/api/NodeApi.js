import axios from 'axios';
import * as rax from 'retry-axios';
import json from 'json-bigint';

import DateTime from '../DateTime';
import Strings from '../Strings';

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
        version: () => get('/node/version'),
        baseTarget: () => get('/consensus/basetarget'),
        addresses: {
            details: (address) => get(`/addresses/balance/details/${address}`),
            aliases: (address) => get(`/alias/by-address/${address}`),
            validate: (address) => get(`/addresses/validate/${address}`),
            data: (address) => get(`/addresses/data/${address}`),
            script: (address) => get(`/addresses/scriptInfo/${address}`)
        },
        blocks: {
            height: () => get('/blocks/height'),
            heightBySignature: (signature) => get(`/blocks/height/${signature}`),
            delay: (fromSignature, count) => get(`/blocks/delay/${fromSignature}/${count}`),
            at: (height) => get(`/blocks/at/${height}`, {
                transformResponse: axios.defaults.transformResponse.concat(transformTimestampToDateTime)
            }),
            headers: {
                last: () => get('/blocks/headers/last', {
                    transformResponse: axios.defaults.transformResponse.concat(transformTimestampToDateTime)
                }),
                sequence: (from, to) => get(`/blocks/headers/seq/${from}/${to}`, {
                    transformResponse: axios.defaults.transformResponse.concat(transformTimestampToDateTime)
                })
            }
        },
        transactions: {
            unconfirmed: () => get('/transactions/unconfirmed'),
            utxSize: () => get('/transactions/unconfirmed/size'),
            info: id => retryableGet(`/transactions/info/${id}`),
            address: (address, limit, after) => {
                const top = limit || TRANSACTIONS_BY_ADDRESS_LIMIT;
                const config = after ? {
                    params: {
                        after
                    }
                } : undefined;

                return get(`/transactions/address/${address}/limit/${top}`, config);
            },
            stateChanges: id => get(`/debug/stateChanges/info/${id}`)
        },
        aliases: {
            address: (alias) => get(`/alias/by-alias/${alias}`)
        },
        assets: {
            balance: (address) => get(`/assets/balance/${address}`),
            details: (assetId, full) => get(`/assets/details/${assetId}`, {
                params: {
                    full: !!full
                }
            }),
            nft: (address) => get(`/assets/nft/${address}/limit/${ASSETS_PER_PAGE}`)
        },
        peers: () => get('/peers/connected'),
    };
};
