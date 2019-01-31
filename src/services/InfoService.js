import axios from 'axios';

import {nodeApi} from '../shared/NodeApi';
import {ApiClientService} from './ApiClientService';

export class InfoService extends ApiClientService {
    constructor(configurationService) {
        super(configurationService);
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
                'Version': version.data.version,
                'Current height': height,
                'Base Target': baseTarget.data.baseTarget
            };
        }));
    };

    loadDelay = (info) => {
        const api = this.getApi();

        return api.blocks.headers.last().then(headerResponse => {
                return api.blocks.delay(headerResponse.data.signature, headerResponse.data.height - 2)
        }).then(delayResponse => {
            const delay = (parseInt(delayResponse.data.delay) / 1000 / 60.0).toFixed(1);

            return Object.assign({}, info, {'Avg Block delay': `${delay} minutes`}) ;
        });
    };
}
