import Dexie from 'dexie';
import Currency from '../shared/Currency';

const CURRENT_DATABASE_VERSION = 1;

class CurrencyCache {
    constructor() {
        this.db = new Dexie('CurrencyCache');
        this.db.version(CURRENT_DATABASE_VERSION).stores({
            cache: 'id, *lastAccess'
        });
    }

    get = id => {
        return this.db.cache.get(id)
            .then(entry => {
                if (!entry)
                    return null;

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
        return this.db.stores.cache.put(entry);
    };
}
