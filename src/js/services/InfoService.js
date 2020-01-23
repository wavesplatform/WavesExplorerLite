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
            .then(heightResponse => heightResponse.data.height);
    };

    loadInfo = () => {
        const api = this.getApi();

        return axios.all([
            api.version(),
            this.loadHeight(),
            api.baseTarget()
        ]).then(axios.spread((version, height, baseTarget) => {
            return {
                [CAPTIONS.VERSION]: version.data.version,
                [CAPTIONS.CURRENT_HEIGHT]: height,
                [CAPTIONS.BASE_TARGET]: baseTarget.data.baseTarget
            };
        }));
    };

    loadDelay = (info) => {
        const api = this.getApi();
        const height = info[CAPTIONS.CURRENT_HEIGHT];

        if (height < BLOCK_DELAY_INTERVAL + 1)
            return Promise.resolve(addBlockDelay(info, 'N/A'));

        return api.blocks.headers.at(height - 1).then(headerResponse => {
            return api.blocks.delay(headerResponse.data.signature, headerResponse.data.height - BLOCK_DELAY_INTERVAL);
        }).then(delayResponse => {
            const sec = parseInt(delayResponse.data.delay)/1000;
            const delay = `${Math.floor(sec / 60) + 'min ' + (sec % 60).toFixed(1)}sec`;
            return addBlockDelay(info, delay);
        });
    };
}
