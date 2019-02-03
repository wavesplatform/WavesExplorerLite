import {CurrencyService} from './CurrencyService';
import {TransactionTransformerService} from './TransactionTransformerService';
import {SearchService} from './SearchService';
import {StorageService} from './StorageService';
import {SpamDetectionService} from './SpamDetectionService';
import {PeersService} from './PeersService';
import {NodesService} from './NodesService';
import {TransactionService} from './TransactionService';
import {BlockService} from './BlockService';
import {AddressService} from './AddressService';
import {InfoService} from './InfoService';
import {AliasService} from './AliasService';
import {AssetService} from './AssetService';
import {ConfigurationService} from './ConfigurationService';

class GlobalServices {
    constructor() {
        this._storageService = new StorageService();
        this._configurationService = new ConfigurationService(this._storageService);
    }

    configurationService = () => this._configurationService;
    storageService = () => this._storageService;
}

class NetworkDependentServices {
    constructor(globalServices, networkId) {
        this._globalServices = globalServices;
        this._networkId = networkId;
        this._currencyService = new CurrencyService(globalServices.configurationService(), networkId);
        this._spamDetectionService = new SpamDetectionService(globalServices.storageService(),
            globalServices.configurationService(), networkId);
        this._transactionTransformerService = new TransactionTransformerService(this._currencyService,
            this._spamDetectionService);
        this._infoService = new InfoService(globalServices.configurationService(), networkId);
    }

    searchService = () => new SearchService(this._globalServices.configurationService(), this._networkId);

    peersService = () => new PeersService(this._globalServices.configurationService(), this._networkId);

    nodesService = () => new NodesService(this._globalServices.configurationService(), this._networkId);

    transactionService = () => new TransactionService(this._transactionTransformerService,
        this._globalServices.configurationService(), this._networkId);

    blockService = () => new BlockService(this._transactionTransformerService,
        this._infoService,
        this._globalServices.configurationService(),
        this._networkId);

    addressService = () => new AddressService(this._transactionTransformerService,
        this._currencyService,
        this._globalServices.configurationService(),
        this._networkId);

    infoService = () => this._infoService;

    aliasService = () => new AliasService(this._globalServices.configurationService(), this._networkId);

    assetService = () => new AssetService(this._globalServices.configurationService(), this._networkId);
}

class ServiceFactory {
    constructor() {
        this._globalServices = new GlobalServices();
        this._serviceMap = {};
    }

    global = () => ({
        configurationService: this._globalServices.configurationService,
    });

    forNetwork = networkId => {
        if (!networkId)
            throw new Error('NetworkId must be provided to get access to services');

        let services = this._serviceMap[networkId];
        if (!services) {
            services = new NetworkDependentServices(this._globalServices, networkId);
            this._serviceMap[networkId] = services;
        }

        return services;
    };
}

const factoryInstance = new ServiceFactory();

export default factoryInstance;
