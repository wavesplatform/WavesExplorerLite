const ANTISPAM_CACHE_KEY = 'AntispamCache';
const CONFIGURATION = 'Configuration';

export class StorageService {
    constructor(storage) {
        this.storage = storage || window.localStorage;
    }

    loadObject = key => {
        const objectAsString = this.storage.getItem(key);

        if (!objectAsString)
            return null;

        return JSON.parse(objectAsString);
    };

    saveObject = (key, object) => {
        this.storage.setItem(key, JSON.stringify(object));
    };

    loadAntispamCache = () => {
        return this.loadObject(ANTISPAM_CACHE_KEY);
    };

    saveAntispamCache = (cache) => {
        this.saveObject(ANTISPAM_CACHE_KEY, cache);
    };

    loadConfiguration = () => {
        return this.loadObject(CONFIGURATION);
    };

    saveConfiguration = (configuration) => {
        this.saveObject(CONFIGURATION, configuration);
    };
}
