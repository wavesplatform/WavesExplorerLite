import configuration from 'configuration';

export class ConfigurationService {
    constructor(storageService) {
        this.storageService = storageService;

        this.configuration = Object.assign({}, configuration);
        const saved = this.storageService.loadConfiguration();
        if (saved) {
            this.configuration.apiBaseUrl = saved.apiBaseUrl;
            this.configuration.spamListUrl = saved.spamListUrl;
        }
    }

    get = () => Object.freeze(this.configuration);

    update = ({apiBaseUrl, spamListUrl}) => {
        this.configuration.apiBaseUrl = apiBaseUrl;
        this.configuration.spamListUrl = spamListUrl;

        this.storageService.saveConfiguration({apiBaseUrl, spamListUrl});
    };
}
