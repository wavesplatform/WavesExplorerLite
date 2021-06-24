import {Decimal} from 'decimal.js';
import BigNumber from 'bignumber.js';
import Money from './Money';

const MATCHER_SCALE = 1e8;

const roundToPriceAsset = (price, pair) => {
    return new Decimal(new Decimal(price).toFixed(pair.priceAsset.precision, Decimal.ROUND_FLOOR));
};

class OrderPrice {
    constructor(price, pair) {
        this.amountAsset = pair.amountAsset;
        this.priceAsset = pair.priceAsset;
        this.price = roundToPriceAsset(price, pair);
    }

    volume = amount => {
        if (amount.currency.id !== this.amountAsset.id)
            throw new Error('Wrong amount currency. Expected: ' + this.amountAsset.toString());

        return Money.fromTokens(this.price.mul(amount.toTokens()), this.priceAsset);
    };

    toString() {
        return this.price.toFixed(8);
    }
}

export default {
    fromTokens: function (price, pair) {
        return new OrderPrice(price, pair);
    },

    fromBackendOrderPrice: function (price, pair, version) {
        if (price instanceof BigNumber || price._isBigNumber)
            price = price.toString();

        const normalizedPrice = version >= 4
            ? new Decimal(price).div(MATCHER_SCALE)
            : new Decimal(price).div(MATCHER_SCALE).div(Math.pow(10, pair.priceAsset.precision - pair.amountAsset.precision));

        return new OrderPrice(normalizedPrice, pair);
    },

    fromBackendExchangePrice: function (price, pair, version) {
        if (price instanceof BigNumber || price._isBigNumber)
            price = price.toString();

        const normalizedPrice = version >= 3
            ? new Decimal(price).div(MATCHER_SCALE)
            : new Decimal(price).div(MATCHER_SCALE).div(Math.pow(10, pair.priceAsset.precision - pair.amountAsset.precision));

        return new OrderPrice(normalizedPrice, pair);
    }
};
