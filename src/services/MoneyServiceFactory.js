import {MoneyService} from './MoneyService';
import {CurrencyService} from './CurrencyService';

class MoneyServiceFactory {
    constructor() {
        this.cache = {};
    }

    currencyService = (networkId) => {
        const instance = this.cache[networkId];
        if (instance) {
            return instance;
        }

        const newOne = new CurrencyService(networkId);
        this.cache[networkId] = newOne;

        return newOne;
    };

    moneyService = (networkId) => new MoneyService(this.currencyService(networkId));
}

const factoryInstance = new MoneyServiceFactory();

export default factoryInstance;
