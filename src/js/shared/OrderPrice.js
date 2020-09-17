import {Decimal} from 'decimal.js';
import BigNumber from 'bignumber.js';
import Money from './Money';

const MATCHER_SCALE = 1e8;

const roundToPriceAsset = (price, pair) => {
    return new Decimal(new Decimal(price).toFixed(pair.priceAsset.precision, Decimal.ROUND_FLOOR));
};

const normalizePrice = (price, pair) => {
    if (price instanceof BigNumber || price._isBigNumber)
        price = price.toString();

    return new Decimal(price)
        .div(MATCHER_SCALE)
        .div(Math.pow(10, pair.priceAsset.precision - pair.amountAsset.precision));
};

class OrderPrice {
    constructor(price, pair) {
        this.amountAsset = pair.amountAsset;
        this.priceAsset = pair.priceAsset;
        this.price = roundToPriceAsset(price, pair);
    }

    toTokens = () => this.price;
    toCoins = () => this.toTokens().mul(Decimal.pow(10, this.priceAsset.precision - this.amountAsset.precision));
    toBackendPrice = () => this.toCoins().mul(MATCHER_SCALE).round().toNumber();

    volume = amount => {
        if (amount.currency.id !== this.amountAsset.id)
            throw new Error('Wrong amount currency. Expected: ' + this.amountAsset.toString());

        return Money.fromTokens(this.toTokens().mul(amount.toTokens()), this.priceAsset);
    };

    toString() {
        return this.toTokens().toFixed(8);
    }
}

export default {
    fromTokens: function (price, pair) {
        return new OrderPrice(price, pair);
    },

    fromBackendPrice: function (price, pair) {
        var normalizedPrice = normalizePrice(price, pair);

        return new OrderPrice(normalizedPrice, pair);
    }
};
