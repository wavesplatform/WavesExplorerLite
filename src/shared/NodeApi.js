import axios from 'axios';

import {create} from '../configuration';
import DateTime from './DateTime';

const TRANSACTIONS_BY_ADDRESS_LIMIT = 100;

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

    return {
        version: () => get('/node/version'),
        baseTarget: () => get('/consensus/basetarget'),
        addresses: {
            details: (address) => get(`/addresses/balance/details/${address}`),
            assetsBalance: (address) => get(`/assets/balance/${address}`),
            aliases: (address) => get(`/alias/by-address/${address}`)
        },
        blocks: {
            height: () => get('/blocks/height'),
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
            info: id => get(`/transactions/info/${id}`),
            address: (address) => get(`/transactions/address/${address}/limit/${TRANSACTIONS_BY_ADDRESS_LIMIT}`)
        },
        peers: () => get('/peers/connected'),
    };
};

export const apiBuilder = (networkId) => {
    const configuration = create(networkId);

    return nodeApi(configuration.apiBaseUrl);
};
