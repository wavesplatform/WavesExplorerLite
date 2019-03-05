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

    static WAVES = new Currency({
        id: '',
        displayName: 'Waves',
        shortName: 'WAVES',
        precision: 8
    });

    static fromIssueTransaction = issueTransaction => {
        return new Currency({
            id: issueTransaction.assetId,
            displayName: issueTransaction.name,
            precision: issueTransaction.decimals
        });
    };

    toString() {
        if (this.shortName)
            return this.shortName;

        return this.displayName;
    }
}
