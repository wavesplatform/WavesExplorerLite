import {ApiClientService} from './ApiClientService';

export class StateChangeService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadStateChanges = (id) => {
        return this.getApi().transactions.stateChanges(id).then(response => response.data);

    };
}
