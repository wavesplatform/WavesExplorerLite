import {ApiClientService} from './ApiClientService';

export class GatewaysService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadGateways = () => {
        const gateways = this.configuration().gateways.slice();

        const promises = gateways.map((gateways, index) => {
                const newGateway = {
                    ...gateways,

                };

                return {
                    index,
                    gateway: newGateway
                };

        });

        return Promise.all(promises).then(values => {
            values.forEach(item => {
                gateways[item.index] = item.gateway;
            });

            return gateways;
        });
    }
}
