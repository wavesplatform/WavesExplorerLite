import axios from 'axios';

import {ApiClientService} from './ApiClientService';

export const CAPTIONS = {
    VERSION: 'Version',
    CURRENT_HEIGHT: 'Current height',
    BASE_TARGET: 'Base Target',
    BLOCK_DELAY: 'Avg Block delay'
};

const BLOCK_DELAY_INTERVAL = 10000;

const addBlockDelay = (info, formattedDelay) => Object.assign({}, info, {[CAPTIONS.BLOCK_DELAY]: formattedDelay});

export class InfoService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadHeight = () => {
        return this.getApi().blocks.height()
            .then(heightResponse => heightResponse.height);
    };

    loadInfo = () => {
        const api = this.getApi();

        return axios.all([
            api.version(),
            this.loadHeight(),
            api.baseTarget()
        ]).then(axios.spread((version, height, baseTarget) => {
            return {
                [CAPTIONS.VERSION]: version.version.split('-')[0],
                [CAPTIONS.CURRENT_HEIGHT]: height,
                [CAPTIONS.BASE_TARGET]: baseTarget
            };
        }));
    };

    loadDelay = (info) => {
        const api = this.getApi();
        const height = info[CAPTIONS.CURRENT_HEIGHT];

        if (height < BLOCK_DELAY_INTERVAL + 1)
            return Promise.resolve(addBlockDelay(info, 'N/A'));

        return api.blocks.headers.at(height - 1).then(headerResponse => {
            return api.blocks.delay(headerResponse.id || headerResponse.signature, BLOCK_DELAY_INTERVAL);
        }).then(delayResponse => {
            const delay = delayResponse.delay/1000 + ' sec';
            return addBlockDelay(info, delay);
        });
    };
}
