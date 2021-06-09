import {Database} from './Database';
import {SafeCurrencyCache} from './SafeCurrencyCache';
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
import {FaucetService} from './FaucetService';
import {ConfigurationService} from './ConfigurationService';
import {AnalyticsService} from './AnalyticsService';
import {ErrorReportingService} from './ErrorReportingService';
import {BrowserService} from './BrowserService';
import {LeaseService} from './LeaseService';

const database = new Database();

class GlobalServices {
    constructor() {
        this._storageService = new StorageService();
        this._configurationService = new ConfigurationService(this._storageService);
        this._analyticsService = new AnalyticsService(__GOOGLE_TRACKING_ID__, __AMPLITUDE_API_KEY__);
        this._errorReportingService = new ErrorReportingService(__SENTRY_DSN__);
        this._browserService = new BrowserService();
    }

    configurationService = () => this._configurationService;
    storageService = () => this._storageService;
    analyticsService = () => this._analyticsService;
    errorReportingService = () => this._errorReportingService;
    browserService = () => this._browserService;
}

class NetworkDependentServices {
    constructor(globalServices, networkId) {
        this._globalServices = globalServices;
        this._networkId = networkId;
        this._currencyService = new CurrencyService(globalServices.configurationService(),
            new SafeCurrencyCache(database, globalServices.errorReportingService()), networkId);
        this._spamDetectionService = new SpamDetectionService(globalServices.storageService(),
            globalServices.configurationService(), networkId);
        this._assetService = new AssetService(globalServices.configurationService(), networkId);
        this._transactionTransformerService = new TransactionTransformerService(this._currencyService,
            this._spamDetectionService, this._assetService);
        this._infoService = new InfoService(globalServices.configurationService(), networkId);
        this._aliasService = new AliasService(globalServices.configurationService(), networkId);
        this._leaseService =  new LeaseService(this._globalServices.configurationService(), this._networkId);
    }

    searchService = () => new SearchService(this._globalServices.configurationService(),
        this._globalServices.analyticsService(),
        this._aliasService,
        this._networkId);

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

    faucetService = () => new FaucetService(this._transactionTransformerService,
        this._globalServices.configurationService(),
        this._networkId);

    aliasService = () => this._aliasService;

    assetService = () => this._assetService;

    leaseService = () => this._leaseService;
}

class ServiceFactory {
    constructor() {
        this._globalServices = new GlobalServices();
        this._serviceMap = {};
    }

    global = () => ({
        configurationService: this._globalServices.configurationService,
        analyticsService: this._globalServices.analyticsService,
        errorReportingService: this._globalServices.errorReportingService,
        browserService: this._globalServices.browserService
    });

    forNetwork = networkId => {
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
