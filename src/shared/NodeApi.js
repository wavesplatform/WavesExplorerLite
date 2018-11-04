import axios from 'axios';

import {create} from '../configuration';
import DateTime from './DateTime';

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
            details: (address) => get(`/addresses/balance/details/${address}`)
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
            unconfirmed: () => get('/transactions/unconfirmed', {
                transformResponse: axios.defaults.transformResponse.concat(transformTimestampToDateTime)
            }),
            utxSize: () => get('/transactions/unconfirmed/size'),
            info: id => get(`/transactions/info/${id}`, {
                transformResponse: axios.defaults.transformResponse.concat(transformTimestampToDateTime)
            })
        },
        peers: () => get('/peers/connected'),
    };
};

export const apiBuilder = (networkId) => {
    const configuration = create(networkId);

    return nodeApi(configuration.apiBaseUrl);
};
