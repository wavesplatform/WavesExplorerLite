import configuredNetworks from '../configuration';
import Strings from '../shared/Strings';

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

    update = ({apiBaseUrl}) => {
        if (!this.customNetwork) {
            this.customNetwork = {
                networkId: CUSTOM_NETWORK_ID,
                displayName: CUSTOM_NETWORK_NAME,
            };
            this.networks.push(this.customNetwork);
        }

        this.customNetwork.apiBaseUrl = Strings.trimEnd(apiBaseUrl, '/');
        this.customNetwork.nodes = [{url: apiBaseUrl}];
        this.save();
    };

    save = () => {
        this.storageService.saveConfiguration({
            customNetwork: this.customNetwork
        });
    };

    getDecompileScriptUrl = () => __DECOMPILE_SCRIPT_URL__;
}
