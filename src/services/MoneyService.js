import Money from '../shared/Money';

export class MoneyService {
    constructor(currencyService) {
        this.currencyService = currencyService;
    }

    fromTokens = (assetId, amount) => {
        return this.currencyService.get(assetId).then(currency => {
            return Money.fromTokens(amount, currency);
        });
    };

    fromCoins = (assetId, amount) => {
        return this.currencyService.get(assetId).then(currency => {
            return Money.fromCoins(amount, currency);
        });
    };
}
