import Currency from '../shared/Currency';
import {api} from '../shared/NodeApi';

const FAILURE = new Currency({
    id: 'failure',
    displayName: 'Failed to load',
    precision: 8
});

export class CurrencyService {
    constructor() {
        this.currencyCache = {};
        this.promisesCashe = {};
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
            if (this.promisesCashe[assetId]) {
                return this.promisesCashe[assetId];
            }

            const promise = api.transactions.info(assetId)
                .then(infoResponse => {
                    const c = Currency.fromIssueTransaction(infoResponse.data);
                    return this.put(c);
                })
                .catch(error => {
                    console.log(error);

                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                    }

                    return FAILURE;
                });

            this.promisesCashe[assetId] = promise;

            return promise;
        }
    };
}
