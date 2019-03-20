import Dexie from 'dexie';

const CURRENT_DATABASE_VERSION = 1;

export class Database {
    constructor() {
        this.db = new Dexie('Cache');
        this.db.version(CURRENT_DATABASE_VERSION).stores({
            currency: 'id, *lastAccess'
        });
    }

    currencyCache = () => this.db.currency;
}
