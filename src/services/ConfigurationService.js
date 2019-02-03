import configuredNetworks from '../configuration';

const CUSTOM_NETWORK_ID = 'custom';
const CUSTOM_NETWORK_NAME = 'Custom';
const copyAndFreeze = object => Object.freeze(Object.assign({}, object));

const trimEnd = (string, char) => {
    while (string.charAt(string.length - 1) === char) {
        string = string.substring(0, string.length - 1);
    }

    return string;
};

export class ConfigurationService {
    constructor(storageService) {
        this.storageService = storageService;

        this.networks = configuredNetworks.slice();
        this.customNetwork = null;
        const saved = this.storageService.loadConfiguration();
        if (saved) {
            this.selectedIndex = saved.selectedIndex;
            if (saved.customNetwork) {
                this.networks.push(saved.customNetwork);
                this.customNetwork = saved.customNetwork;
            }
        } else {
            this.selectedIndex = 0;
        }
    }

    get = (networkId) => {
        const configuration = this.networks.find(network => network.networkId === networkId);
        if (!configuration)
            throw new Error(`Configuration hasn't been found by id '${networkId}'`);

        return copyAndFreeze(configuration);
    };

    all = () => this.networks.slice();

    custom = () => this.customNetwork ? copyAndFreeze(this.customNetwork) : null;

    update = ({apiBaseUrl}) => {
        if (!this.customNetwork) {
            this.customNetwork = {
                networkId: CUSTOM_NETWORK_ID,
                displayName: CUSTOM_NETWORK_NAME,
            };
            this.networks.push(this.customNetwork);
        }

        this.customNetwork.apiBaseUrl = trimEnd(apiBaseUrl, '/');
        this.customNetwork.nodes = [{url: apiBaseUrl}];
        this.save();
    };

    save = () => {
        this.storageService.saveConfiguration({
            customNetwork: this.customNetwork
        });
    }
}
