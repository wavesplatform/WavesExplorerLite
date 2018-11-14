var OrderPrice = (function () {

    var MATCHER_SCALE = 1e8;

    function OrderPrice(price, pair) {
        this.amountAsset = pair.amountAsset;
        this.priceAsset = pair.priceAsset;
        this.price = roundToPriceAsset(price, pair);
    }

    OrderPrice.prototype.toTokens = function () {
        return this.price.toNumber();
    };

    OrderPrice.prototype.toCoins = function () {
        return this.toTokens() * Math.pow(10, this.priceAsset.precision - this.amountAsset.precision);
    };

    OrderPrice.prototype.toBackendPrice = function () {
        return Math.round(this.toCoins() * MATCHER_SCALE);
    };

    function roundToPriceAsset(price, pair) {
        return new Decimal(new Decimal(price).toFixed(pair.priceAsset.precision, Decimal.ROUND_FLOOR));
    }

    function normalizePrice(price, pair) {
        return new Decimal(price)
            .div(MATCHER_SCALE)
            .div(Math.pow(10, pair.priceAsset.precision - pair.amountAsset.precision));
    }

    return {
        fromTokens: function (price, pair) {
            return new OrderPrice(price, pair);
        },

        fromBackendPrice: function (price, pair) {
            var normalizedPrice = normalizePrice(price, pair);

            return new OrderPrice(normalizedPrice, pair);
        }
    };
})();
