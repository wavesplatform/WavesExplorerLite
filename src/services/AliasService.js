import {ApiClientService} from './ApiClientService';

export class AliasService extends ApiClientService {
    constructor(configurationService) {
        super(configurationService);
    }

    loadAddress = (alias) => {
        return this.getApi().aliases.address(alias)
            .then(addressResponse => addressResponse.data.address);
    };
}
