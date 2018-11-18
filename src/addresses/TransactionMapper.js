import sumBy from 'lodash/sumBy';
import DateTime from '../shared/DateTime';
import Money from '../shared/Money';
import Currency from '../shared/Currency';
import OrderPrice from '../shared/OrderPrice';
import MoneyServiceFactory from '../services/MoneyServiceFactory';

// consider extracting to a module
const INCOMING = 'incoming';
const OUTGOING = 'outgoing';

const transactionMapper = (networkId, transactions, currentAddress) => {

    const currencyService = MoneyServiceFactory.currencyService(networkId);
    const promises = transactions.map(item => mapTransactionToPromise(currencyService, item, currentAddress));

    return Promise.all(promises);
};

const mapTransactionToPromise = (currencyService, tx, currentAddress) => {
    switch (tx.type) {
        case 2:
        case 4:
            return mapTransfer(currencyService, tx, currentAddress);

        case 3:
            return mapIssue(currencyService, tx, currentAddress);

        case 5:
            return mapReissue(currencyService, tx, currentAddress);

        case 6:
            return mapBurn(currencyService, tx, currentAddress);

        case 7:
            return mapExchange(currencyService, tx, currentAddress);

        case 8:
            return mapLease(currencyService, tx, currentAddress);

        case 9:
            return mapLeaseCancel(currencyService, tx, currentAddress);

        case 10:
            return mapAlias(currencyService, tx, currentAddress);

        case 11:
            return mapMassTransfer(currencyService, tx, currentAddress);

        default:
            return Promise.resolve(tx);
    }
};

const copyMandatoryAttributes = tx => ({
    id: tx.id,
    type: tx.type,
    timestamp: new DateTime(tx.timestamp),
    sender: tx.sender
});

const defaultDirection = (tx, currentAddress) => {
    return tx.sender === currentAddress ? OUTGOING : null;
};

const moneyToObject = money => ({
    amount: money.formatAmount(),
    currency: money.currency.toString()
});

const mapMassTransfer = (currencyService, tx, currentAddress) => {
    return currencyService.get(tx.assetId).then(currency => {
        const tail = {};
        if (tx.sender === currentAddress) {
            tail.direction = OUTGOING;
            tail.out = moneyToObject(Money.fromCoins(tx.totalAmount, currency));
        } else {
            tail.direction = INCOMING;
            tail.recipient = currentAddress;

            const amount = sumBy(tx.transfers.filter(transfer => transfer.recipient === currentAddress), 'amount');
            tail.in = moneyToObject(Money.fromCoins(amount, currency));
        }

        return Object.assign(copyMandatoryAttributes(tx), tail);
    });
};

const mapAlias = (currencyService, tx, currentAddress) => {
    return Promise.resolve(
        Object.assign(copyMandatoryAttributes(tx), {
            direction: defaultDirection(tx, currentAddress)
        })
    );
};

const mapLease = (currencyService, tx, currentAddress) => {
    return Promise.resolve(
        Object.assign(copyMandatoryAttributes(tx), {
            direction: defaultDirection(tx, currentAddress),
            recipient: tx.recipient,
            out: moneyToObject(Money.fromCoins(tx.amount, Currency.WAVES))
        })
    );
};

const mapLeaseCancel = (currencyService, tx, currentAddress) => {
    return Promise.resolve(
        Object.assign(copyMandatoryAttributes(tx), {
            direction: defaultDirection(tx, currentAddress),
            recipient: tx.lease.recipient
        })
    );
};

const mapExchange = (currencyService, tx, currentAddress) => {
    const buyOrder = tx.order1.orderType === 'buy' ? tx.order1 : tx.order2;
    const sellOrder = tx.order2.orderType === 'sell' ? tx.order2 : tx.order1;
    const assetPair = buyOrder.assetPair;

    return Promise.all([
        currencyService.get(assetPair.amountAsset),
        currencyService.get(assetPair.priceAsset)
    ]).then(pair => {
        const currencyPair = {
            amountAsset: pair[0],
            priceAsset: pair[1]
        };

        const price = OrderPrice.fromBackendPrice(tx.price, currencyPair).toTokens();
        const amount = Money.fromCoins(tx.amount, currencyPair.amountAsset);

        return Object.assign(copyMandatoryAttributes(tx), {
            sender: sellOrder.sender,
            recipient: buyOrder.sender,
            in: {
                amount: (price * amount.toTokens()).toFixed(currencyPair.priceAsset.precision),
                currency: currencyPair.priceAsset.toString()
            },
            out: moneyToObject(amount),
            price: {
                amount: price.toFixed(8),
                currency: currencyPair.priceAsset.toString()
            }
        });
    });
};

const mapBurn = (currencyService, tx, currentAddress) => {
    return currencyService.get(tx.assetId).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            direction: defaultDirection(tx, currentAddress),
            out: moneyToObject(Money.fromCoins(tx.amount, currency))
        });
    });
};

const mapReissue = (currencyService, tx, currentAddress) => {
    return currencyService.get(tx.assetId).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            direction: defaultDirection(tx, currentAddress),
            out: moneyToObject(Money.fromCoins(tx.quantity, currency))
        });
    });
};

const mapIssue = (currencyService, tx, currentAddress) => {
    const c = Currency.fromIssueTransaction(tx);
    currencyService.put(c);

    return currencyService.get(c.id).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            direction: defaultDirection(tx, currentAddress),
            out: moneyToObject(Money.fromCoins(tx.quantity, currency))
        });
    });
};

const mapTransfer = (currencyService, tx, currentAddress) => {
    return currencyService.get(tx.assetId).then(currency => {
        const tail = {recipient: tx.recipient};
        const money = moneyToObject(Money.fromCoins(tx.amount, currency));

        if (tx.recipient === currentAddress) {
            tail.direction = INCOMING;
            tail.in = money;
        } else {
            tail.direction = OUTGOING;
            tail.out = money;
        }

        return Object.assign(copyMandatoryAttributes(tx), tail);
    });
};

export default transactionMapper;
