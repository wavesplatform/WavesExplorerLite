import configuredNetworks from '../configuration';

const CUSTOM_NETWORK_ID = 'custom';
const CUSTOM_NETWORK_NAME = 'Custom';
const copyAndFreeze = object => Object.freeze(Object.assign({}, object));

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

    get = () => copyAndFreeze(this.networks[this.selectedIndex]);

    all = () => this.networks.slice();

    custom = () => this.customNetwork ? copyAndFreeze(this.customNetwork) : null;

    select = (networkId) => {
        const index = this.networks.findIndex(item => item.networkId === networkId);
        if (index < 0) {
            throw new Error(`Network with id ${networkId} is not found`);
        }

        this.selectedIndex = index;
        this.save();
    };

    update = ({apiBaseUrl}) => {
        if (!this.customNetwork) {
            this.customNetwork = {
                networkId: CUSTOM_NETWORK_ID,
                displayName: CUSTOM_NETWORK_NAME,
            };
            this.networks.push(this.customNetwork);
        }

        this.customNetwork.apiBaseUrl = apiBaseUrl;
        this.customNetwork.nodes = [{url: apiBaseUrl}];
        this.selectedIndex = this.networks.length - 1;

        this.save();
    };

    save = () => {
        this.storageService.saveConfiguration({
            selectedIndex: this.selectedIndex,
            customNetwork: this.customNetwork
        });
    }
}
