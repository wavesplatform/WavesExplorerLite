import Currency from '../shared/Currency';

export class DatabaseCurrencyCache {
    constructor(database, errorReportingService) {
        this.cache = database.currencyCache();
        this.errorReportingService = errorReportingService;
    }

    get = id => {
        return this.cache.get(id)
            .then(entry => {
                if (!entry) {
                    return null;
                }

                entry.lastAccess = Date.now();
                this._putSilently(entry);

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
        return this._putSilently(entry);
    };

    _putSilently = entry => {
        return this.cache.put(entry).catch(error => {
            this.errorReportingService.captureException(error);
        });
    }
}
