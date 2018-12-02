const ANTISPAM_CACHE_KEY = 'AntispamCache';

export class StorageService {
    constructor() {
        this.storage = window.localStorage;
    }

    loadAntispamCache = () => {
        const objectAsString = this.storage.getItem(ANTISPAM_CACHE_KEY);

        if (!objectAsString)
            return null;

        return JSON.parse(objectAsString);
    };

    saveAntispamCache = (cache) => {
        this.storage.setItem(ANTISPAM_CACHE_KEY, JSON.stringify(cache));
    };
}
