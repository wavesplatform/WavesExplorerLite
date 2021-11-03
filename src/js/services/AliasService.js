import {dataServicesApi} from '../shared/api/DataServicesApi';
import {ApiClientService} from './ApiClientService';

export class AliasService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    async loadAddress(alias) {
        return this.getApi().aliases.address(alias)
            .then(addressResponse => {
                addressResponse = addressResponse.data

                if (addressResponse.__type === 'alias') {
                    return addressResponse.data.address;
                }

                return addressResponse.address;
            })
            .then(address => {
                if (!address)
                    throw new Error('Invalid alias detected');

                return address;
            });
    };

    getApi() {
        const configuration = this.configuration();
        if (!configuration.dataServicesBaseUrl) {
            return super.getApi();
        }

        return dataServicesApi(configuration.dataServicesBaseUrl);
    }
}

