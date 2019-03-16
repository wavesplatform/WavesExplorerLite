import {dataServicesApi} from '../shared/api/DataServicesApi';
import {ConfigurableService} from './ConfigurableService';

export class AliasService extends ConfigurableService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadAddress = (alias) => {
        return this.getApi().aliases.address(alias)
            .then(addressResponse => addressResponse.data.data.address);
    };

    getApi = () => dataServicesApi(this.configuration().dataServicesBaseUrl);
}

