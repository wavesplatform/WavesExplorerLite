import Currency from '../shared/Currency';

export class CurrencyCache {
    constructor(database) {
        this.cache = database.currencyCache();
    }

    get = id => {
        return this.cache.get(id)
            .then(entry => {
                if (!entry) {
                    return null;
                }

                entry.lastAccess = Date.now();
                this.cache.put(entry);

                return new Currency(entry);
            });
    };

    put = currency => {
        const entry = {
            id: currency.id,
            displayName: currency.displayName,
            precision: currency.precision,
            lastAccess: Date.now()
        };
        return this.cache.put(entry);
    };
}
