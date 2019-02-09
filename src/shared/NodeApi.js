import axios from 'axios';
import * as rax from 'retry-axios';

import DateTime from './DateTime';

const TRANSACTIONS_BY_ADDRESS_LIMIT = 100;

const retryableAxios = axios.create();
retryableAxios.defaults.raxConfig = {
    instance: retryableAxios,
    retryDelay: 10,
    httpMethodsToRetry: ['GET']
};
rax.attach(retryableAxios);

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

export const nodeApi = (baseUrl) => {
    const get = (url, config) => axios.get(baseUrl + url, config);
    const retryableGet = (url, config) => retryableAxios.get(baseUrl + url, config);

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
            address: (address) => get(`/transactions/address/${address}/limit/${TRANSACTIONS_BY_ADDRESS_LIMIT}`)
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
            })
        },
        peers: () => get('/peers/connected'),
    };
};
