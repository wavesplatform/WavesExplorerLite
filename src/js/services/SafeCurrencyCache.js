import {DatabaseCurrencyCache} from './DatabaseCurrencyCache';
import {MemoryCurrencyCache} from './MemoryCurrencyCache';

export class SafeCurrencyCache {
    constructor(database, errorReportingService) {
        if (!database)
            throw new Error('database should be defined for caching currencies');

        if (!errorReportingService)
            throw new Error('errorReportingService should be defined for caching currencies');

        this.errorReportingService = errorReportingService;
        this.database = database;
        this.cache = null;
    }

    get = id => {
        return this.getInstance().then(cache => cache.get(id));
    };

    put = currency => {
        return this.getInstance().then(cache => cache.put(currency));
    };

    getInstance = () => {
        if (this.cache) {
            return Promise.resolve(this.cache);
        }

        try {
            return this.database.ensureSupported()
                .then(() => {
                    this.cache = new DatabaseCurrencyCache(this.database, this.errorReportingService);

                    return this.cache;
                })
                .catch(error => {
                    this.errorReportingService.captureException(error);

                    this.cache = new MemoryCurrencyCache();

                    return this.cache;
                })
        } catch (e) {
            this.errorReportingService.captureException(e);

            this.cache = new MemoryCurrencyCache();

            return Promise.resolve(this.cache);
        }
    }
}
