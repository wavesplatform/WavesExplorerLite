import axios from 'axios';

import {create} from '../configuration';

export const nodeApi = (baseUrl) => {
    const get = url => axios.get(baseUrl + url);

    return {
        version: () => get('/node/version'),
        baseTarget: () => get('/consensus/basetarget'),
        blocks: {
            height: () => get('/blocks/height'),
        },
        transactions: {
            utxSize: () => get('/transactions/unconfirmed/size'),
        },
        peers: () => get('/peers/connected'),
    };
};

export const apiBuilder = (networkId) => {
    const configuration = create(networkId);

    return nodeApi(configuration.apiBaseUrl);
};
