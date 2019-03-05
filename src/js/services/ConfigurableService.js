export class ConfigurableService {
    constructor(configurationService, networkId) {
        this.configurationService = configurationService;
        this.networkId = networkId;
    }

    configuration = () => this.configurationService.get(this.networkId);
}
