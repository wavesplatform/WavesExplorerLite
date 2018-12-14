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

class ServiceFactory {
    constructor() {
        this._currencyService = new CurrencyService();
        this._storageService = new StorageService();
        this._spamDetectionService = new SpamDetectionService(this._storageService);
        this._transactionTransformerService = new TransactionTransformerService(this._currencyService,
            this._spamDetectionService);
        this._infoService = new InfoService();
    }

    currencyService = () => this._currencyService;

    moneyService = () => new MoneyService(this._currencyService);

    transactionTransformerService = () => this._transactionTransformerService;

    searchService = () => new SearchService();

    peersService = () => new PeersService();

    nodesService = () => new NodesService();

    transactionService = () => new TransactionService(this._transactionTransformerService);

    blockService = () => new BlockService(this._transactionTransformerService, this._infoService);

    addressService = () => new AddressService(this._transactionTransformerService, this._currencyService);

    infoService = () => this._infoService;
}

const factoryInstance = new ServiceFactory();

export default factoryInstance;
