import configuration from 'configuration';

const copyAndFreeze = object => Object.freeze(Object.assign({}, object));

export class ConfigurationService {
    constructor(storageService) {
        this.storageService = storageService;
        this.defaultConfiguration = configuration;

        this.configuration = Object.assign({}, this.defaultConfiguration);
        const saved = this.storageService.loadConfiguration();
        if (saved) {
            this.configuration.apiBaseUrl = saved.apiBaseUrl;
            this.configuration.spamListUrl = saved.spamListUrl;
        }
    }

    get = () => copyAndFreeze(this.configuration);

    default = () => copyAndFreeze(this.defaultConfiguration);

    update = ({apiBaseUrl, spamListUrl}) => {
        this.configuration.apiBaseUrl = apiBaseUrl;
        this.configuration.spamListUrl = spamListUrl;

        this.storageService.saveConfiguration({apiBaseUrl, spamListUrl});
    };
}
