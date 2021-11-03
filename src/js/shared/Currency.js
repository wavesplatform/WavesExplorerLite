import {Decimal} from 'decimal.js';

export default class Currency {
    constructor(data) {
        data = data || {};

        this.id = data.id; // base58 encoded asset id of the currency
        this.displayName = data.displayName;
        this.shortName = data.shortName || data.displayName;
        this.precision = data.precision; // number of decimal places after a decimal point

        if (data.roundingMode !== undefined) {
            this.roundingMode = data.roundingMode;
        } else {
            this.roundingMode = Decimal.ROUND_HALF_UP;
        }
    }

    static TN = new Currency({
        id: '',
        displayName: 'TN',
        shortName: 'TN',
        precision: 8
    });

    static currencyFromData = data => {
        return new Currency({
            id: data.assetId,
            displayName: data.name,
            precision: data.decimals
        });
    };

    static fromIssueTransaction = issueTransaction => {
        return this.currencyFromData(issueTransaction)
    };

    static fromAssetDetails = assetDetails => {
        return this.currencyFromData(assetDetails)
    };

    toString() {
        if (this.shortName)
            return this.shortName;

        return this.displayName;
    }
}
