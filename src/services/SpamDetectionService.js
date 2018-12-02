import thirdPartyApi from '../shared/ThirdPartyApi';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export class SpamDetectionService {
    constructor(storageService) {
        this.storageService = storageService;
        this.cache = storageService.loadAntispamCache() || {
            spamAssets: {}
        };
        this.updating = false;
    }

    isSpam = (assetId) => {
        const result = !!this.cache.spamAssets[assetId];

        this.updateCacheIfNeeded();

        return result;
    };

    updateCacheIfNeeded = () => {
        if (this.updating)
            return;

        if (!this.cache.expirationTime || this.cache.expirationTime <= new Date().getTime()) {
            this.updating = true;

            thirdPartyApi.antispamList().then(listResponse => {
                this.cache.spamAssets = this.parseAssetList(listResponse.data);
                // cache should expire in one day
                this.cache.expirationTime = new Date().getTime() + MILLISECONDS_PER_DAY;
                this.storageService.saveAntispamCache(this.cache);
            }).finally(() => {
                this.updating = false;
            });
        }
    };

    parseAssetList = (listAsString) => {
        const lines = listAsString.split('\n');
        const result = {};
        lines.forEach(line => {
            const parts = line.split(',');
            if (parts.length > 0) {
                const assetId = parts[0].trim();
                if (assetId) {
                    result[assetId] = true;
                }
            }
        });

        return result;
    }
}
