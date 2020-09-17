export class MemoryCache {
    constructor() {
        this.cache = {};
    }

    get = id => {
        return Promise.resolve(this.cache[id]);
    };

    put = currency => {
        this.cache[currency.id] = currency;
    };
}
