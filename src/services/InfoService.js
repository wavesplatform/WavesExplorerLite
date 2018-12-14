import axios from 'axios';

import {api} from '../shared/NodeApi';

export class InfoService {
    loadHeight = () => {
        return api.blocks.height()
            .then(heightResponse => heightResponse.data.height);
    };

    loadInfo = () => {
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
        return api.blocks.headers.last().then(headerResponse => {
                return api.blocks.delay(headerResponse.data.signature, headerResponse.data.height - 2)
        }).then(delayResponse => {
            const delay = (parseInt(delayResponse.data.delay) / 1000 / 60.0).toFixed(1);

            return Object.assign({}, info, {'Avg Block delay': `${delay} minutes`}) ;
        });
    };
}
