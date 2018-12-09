import {MoneyService} from './MoneyService';
import {CurrencyService} from './CurrencyService';
import {TransactionTransformerService} from './TransactionTransformerService';
import {SearchService} from './SearchService';
import {StorageService} from './StorageService';
import {SpamDetectionService} from './SpamDetectionService';

class ServiceFactory {
    constructor() {
        this._currencyService = new CurrencyService();
        this._storageService = new StorageService();
        this._spamDetectionService = new SpamDetectionService(this._storageService);
    }

    currencyService = () => this._currencyService;

    moneyService = () => new MoneyService(this._currencyService);

    transactionTransformerService = () => new TransactionTransformerService(this._currencyService,
        this._spamDetectionService);

    searchService = () => new SearchService();
}

const factoryInstance = new ServiceFactory();

export default factoryInstance;
