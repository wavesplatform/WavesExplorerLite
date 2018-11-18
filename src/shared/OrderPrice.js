import {Decimal} from 'decimal.js';

const MATCHER_SCALE = 1e8;

const roundToPriceAsset = (price, pair) => {
    return new Decimal(new Decimal(price).toFixed(pair.priceAsset.precision, Decimal.ROUND_FLOOR));
};

const normalizePrice = (price, pair) => {
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

    toTokens = () => this.price.toNumber();
    toCoins = () => this.toTokens() * Math.pow(10, this.priceAsset.precision - this.amountAsset.precision);
    toBackendPrice = () => Math.round(this.toCoins() * MATCHER_SCALE);
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
