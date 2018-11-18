import Currency from '../shared/Currency';
import apiBuilder from '../shared/NodeApi';

const FAILURE = new Currency({
    id: 'failure',
    displayName: 'Failed to load',
    precision: 8
});

export class CurrencyService {
    constructor(networkId) {
        this.currencyCache = {};
        this.api = apiBuilder(networkId);
    }

    put = currency => {
        if (this.currencyCache[currency.id]) {
            return this.currencyCache[currency.id];
        } else {
            this.currencyCache[currency.id] = currency;
            return currency;
        }
    };

    get = assetId => {
        if (!assetId) {
            return Promise.resolve(Currency.WAVES);
        }

        const currency = this.currencyCache[assetId];
        if (currency) {
            return Promise.resolve(currency);
        } else {
            return this.api.transactions.info(assetId)
                .then(infoResponse => {
                    const c = Currency.fromIssueTransaction(infoResponse.data);
                    return this.put(c);
                })
                .catch(error => {
                    console.log(error);

                    return FAILURE;
            });
        }
    };
}
