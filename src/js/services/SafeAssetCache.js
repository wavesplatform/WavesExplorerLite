import {MemoryCache} from './MemoryCache';

export class SafeAssetCache {
    constructor() {
        this.cache = null;
    }

    get = id => {
        return this.getInstance().then(cache => cache.get(id));
    };

    put = asset => {
        return this.getInstance().then(cache => cache.put(asset));
    };

    getInstance = () => {
        if (this.cache) {
            return Promise.resolve(this.cache);
        }

        this.cache = new MemoryCache();

        return Promise.resolve(this.cache);
    }
}
