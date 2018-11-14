import Currency from '../shared/Currency';

export default class CurrencyService {
    constructor() {
        this.currencyCache = {};
    }

    push = issueTransaction => {
        if (this.currencyCache[issueTransaction.assetId]) {
            return;
        }

        this.currencyCache[issueTransaction.assetId] = new Currency({
            id: issueTransaction.assetId,
            displayName: issueTransaction.name,
            precision: issueTransaction.decimals
        });
    };
}
