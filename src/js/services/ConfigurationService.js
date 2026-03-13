import configuredNetworks from '../configuration';
import Strings from '../shared/Strings';

const CUSTOM_NETWORK_ID = 'custom';
const CUSTOM_NETWORK_NAME = 'Custom';
const DEFAULT_CUSTOM_GENERATION_PERIOD_LENGTH = 10;
const copyAndFreeze = object => Object.freeze(Object.assign({}, object));

export class ConfigurationService {
    constructor(storageService) {
        this.storageService = storageService;
        this.networks = configuredNetworks.slice();
        this.customNetwork = global.__CONFIG__ && global.__CONFIG__.API_NODE_URL
            ? {
                "networkId": "custom",
                "displayName": "Custom",
                "apiBaseUrl": global.__CONFIG__.API_NODE_URL,
                "nodes": [{"url": global.__CONFIG__.API_NODE_URL}],
                "generationPeriodLength": DEFAULT_CUSTOM_GENERATION_PERIOD_LENGTH
            } : null

        const saved = this.storageService.loadConfiguration();
        if (this.customNetwork) {
            this.networks.push(this.customNetwork);
            this.selectedIndex = this.networks.length - 1;
        } else if (saved) {
            this.selectedIndex = saved.selectedIndex;
            if (saved.customNetwork) {
                this.networks.push(saved.customNetwork);
                this.customNetwork = saved.customNetwork;
                if (!this.customNetwork.generationPeriodLength) {
                    this.customNetwork.generationPeriodLength = DEFAULT_CUSTOM_GENERATION_PERIOD_LENGTH;
                }
            }
        } else {
            this.selectedIndex = 0;
        }
    }

    get = (networkId) => {
        if (!networkId)
            return this.default();

        const configuration = this.networks.find(network => network.networkId === networkId);
        if (!configuration)
            throw new Error(`Configuration hasn't been found by id '${networkId}'`);

        return copyAndFreeze(configuration);
    };

    default = () => {
        return copyAndFreeze(this.networks[0]);
    };

    all = () => this.networks.slice();

    custom = () => this.customNetwork ? copyAndFreeze(this.customNetwork) : null;

    update = ({apiBaseUrl, generationPeriodLength}) => {
        if (!this.customNetwork) {
            this.customNetwork = {
                networkId: CUSTOM_NETWORK_ID,
                displayName: CUSTOM_NETWORK_NAME,
                generationPeriodLength: DEFAULT_CUSTOM_GENERATION_PERIOD_LENGTH
            };
            this.networks.push(this.customNetwork);
        }

        this.customNetwork.apiBaseUrl = Strings.trimEnd(apiBaseUrl, '/');
        this.customNetwork.nodes = [{url: apiBaseUrl}];
        this.customNetwork.generationPeriodLength = Number.parseInt(generationPeriodLength, 10) || DEFAULT_CUSTOM_GENERATION_PERIOD_LENGTH;
        this.save();
    };

    save = () => {
        this.storageService.saveConfiguration({
            customNetwork: this.customNetwork
        });
    };
}
