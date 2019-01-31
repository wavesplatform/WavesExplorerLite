import {nodeApi} from '../shared/NodeApi';

export class ApiClientService {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }

    getApi = () => nodeApi(this.configurationService.get().apiBaseUrl);
}
