import {Decimal} from 'decimal.js';
import BigNumber from 'bignumber.js';
import isNumber from 'lodash/isNumber';
import Currency from './Currency';

const DECIMAL_SEPARATOR = '.';
const THOUSANDS_SEPARATOR = ',';

const format = (value, currency) => value.toFixed(currency.precision, currency.roundingMode);
const validateCurrency = (expected, actual) => {
    if (expected.id !== actual.id)
        throw new Error('Currencies must be the same for operands. Expected: ' +
            expected.displayName + '; Actual: ' + actual.displayName);
};

const fromTokensToCoins = (valueInTokens, currencyPrecision) => valueInTokens
    .mul(Math.pow(10, currencyPrecision)).trunc();

const fromCoinsToTokens = (valueInCoins, currencyPrecision) => valueInCoins
    .trunc().div(Math.pow(10, currencyPrecision));

// in 2016 Safari doesn't support toLocaleString()
// that's why we need this method
const formatWithThousandsSeparator = (formattedAmount) => {
    var parts = formattedAmount.split(DECIMAL_SEPARATOR);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

    return parts.join(DECIMAL_SEPARATOR);
};

export default class Money {
    constructor(amount, currency) {
        if (amount === undefined)
            throw new Error('Amount is required');

        if (currency === undefined)
            throw new Error('Currency is required');

        if (amount instanceof BigNumber || amount._isBigNumber)
            amount = amount.toString();

        this.amount = new Decimal(amount)
            .toDecimalPlaces(currency.precision, Decimal.ROUND_FLOOR);
        this.currency = currency;
    }

    static fromTokens = (amount, currency) => new Money(amount, currency);
    static fromCoins = (amount, currency) => {
        currency = currency || {};
        if (currency.precision === undefined){
            //console.log(currency);
            throw new Error('A valid currency must be provided');
        }


        if (amount instanceof BigNumber || amount._isBigNumber)
            amount = amount.toString();

        amount = new Decimal(amount);
        amount = amount.div(Math.pow(10, currency.precision));

        return new Money(amount, currency);
    };

    formatAmount = (stripZeroes, useThousandsSeparator) => {
        const result = stripZeroes ?
            this.amount.toFixed(this.amount.decimalPlaces()) :
            format(this.amount, this.currency);

        return useThousandsSeparator ? formatWithThousandsSeparator(result) : result;
    };

    toTokens = () => {
        return this.amount;
    };

    toCoins = () => fromTokensToCoins(this.amount, this.currency.precision);

    plus = money => {
        validateCurrency(this.currency, money.currency);

        return new Money(this.amount.plus(money.amount), this.currency);
    };

    minus = money => {
        validateCurrency(this.currency, money.currency);

        return new Money(this.amount.minus(money.amount), this.currency);
    };

    greaterThan = other => {
        validateCurrency(this.currency, other.currency);

        return this.amount.greaterThan(other.amount);
    };

    greaterThanOrEqualTo = other => {
        validateCurrency(this.currency, other.currency);

        return this.amount.greaterThanOrEqualTo(other.amount);
    };

    lessThan = other => {
        validateCurrency(this.currency, other.currency);

        return this.amount.lessThan(other.amount);
    };

    lessThanOrEqualTo = other => {
        validateCurrency(this.currency, other.currency);

        return this.amount.lessThanOrEqualTo(other.amount);
    };

    multiply = multiplier => {
        if (!isNumber(multiplier))
            throw new Error('Number is expected');

        if (isNaN(multiplier))
            throw new Error('Multiplication by NaN is not supported');

        return new Money(this.amount.mul(multiplier), this.currency);
    };

    toString = () => this.formatAmount(true, true) + ' ' + this.currency.toString();
}

// set up decimal to format 0.00000001 as is instead of 1e-8
Decimal.config({toExpNeg: -(Currency.TN.precision + 1)});

