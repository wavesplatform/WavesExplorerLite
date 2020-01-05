import Currency from '../shared/Currency';
import {ApiClientService} from './ApiClientService';

const FAILURE = new Currency({
    id: 'failure',
    displayName: 'Failed to load',
    precision: 8
});

export class CurrencyService extends ApiClientService {
    constructor(configurationService, currencyCache, networkId) {
        super(configurationService, networkId);
        this.promisesCache = {};
        this.currencyCache = currencyCache;
    }

    put = currency => {
        this.currencyCache.put(currency);
    };

    get = assetId => {
        if (!assetId) {
            return Promise.resolve(Currency.TN);
        }


        return this.currencyCache.get(assetId)
            .then(currency => {
                if (currency) {
                    return currency;
                }

                if (this.promisesCache[assetId]) {
                    return this.promisesCache[assetId];
                }

                const promise = this.getApi().transactions.info(assetId)
                    .then(infoResponse => {
                        const c = Currency.fromIssueTransaction(infoResponse.data);
                        this.put(c);

                        return c;
                    })
                    .catch(error => {
                        console.log(error);

                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                        }

                        return FAILURE;
                    });

                this.promisesCache[assetId] = promise;

                return promise;
            });
    };
}
