const ANTISPAM_CACHE_KEY = 'AntispamCache';

export class StorageService {
    constructor() {
        this.storage = window.localStorage;
    }

    loadAntispamCache = () => {
        return this.storage.getItem(ANTISPAM_CACHE_KEY);
    };

    saveAntispamCache = (cache) => {
        this.storage.setItem(ANTISPAM_CACHE_KEY, cache);
    };
}
