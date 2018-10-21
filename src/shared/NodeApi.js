import axios from 'axios';

import {create} from '../configuration';
import DateTime from './DateTime';

const replaceTimestampWithDateTime = obj => {
    if (obj.timestamp) {
        obj.timestamp = new DateTime(obj.timestamp);
    }
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
        blocks: {
            height: () => get('/blocks/height'),
            delay: (fromSignature, count) => get(`/blocks/delay/${fromSignature}/${count}`),
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
        },
        peers: () => get('/peers/connected'),
    };
};

export const apiBuilder = (networkId) => {
    const configuration = create(networkId);

    return nodeApi(configuration.apiBaseUrl);
};
