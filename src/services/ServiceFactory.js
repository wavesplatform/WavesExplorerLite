import {MoneyService} from './MoneyService';
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
import {ConfigurationService} from './ConfigurationService';

class ServiceFactory {
    constructor() {
        this._storageService = new StorageService();
        this._configurationService = new ConfigurationService(this._storageService);
        this._currencyService = new CurrencyService(this._configurationService);
        this._spamDetectionService = new SpamDetectionService(this._storageService, this._configurationService);
        this._transactionTransformerService = new TransactionTransformerService(this._currencyService,
            this._spamDetectionService);
        this._infoService = new InfoService(this._configurationService);
    }

    currencyService = () => this._currencyService;

    moneyService = () => new MoneyService(this._currencyService);

    transactionTransformerService = () => this._transactionTransformerService;

    searchService = () => new SearchService(this._configurationService);

    peersService = () => new PeersService(this._configurationService);

    nodesService = () => new NodesService(this._configurationService);

    transactionService = () => new TransactionService(this._transactionTransformerService, this._configurationService);

    blockService = () => new BlockService(this._transactionTransformerService,
        this._infoService,
        this._configurationService);

    addressService = () => new AddressService(this._transactionTransformerService,
        this._currencyService,
        this._configurationService);

    infoService = () => this._infoService;

    aliasService = () => new AliasService(this._configurationService);

    configurationService = () => this._configurationService;
}

const factoryInstance = new ServiceFactory();

export default factoryInstance;
