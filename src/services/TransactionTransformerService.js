import Currency from '../shared/Currency';
import Money from '../shared/Money';
import OrderPrice from '../shared/OrderPrice';
import DateTime from '../shared/DateTime';

const transformMultiple = (currencyService, transactions) => {
    const promises = transactions.map(item => transformSingle(currencyService, item));

    return Promise.all(promises);
};

const transformSingle = (currencyService, tx) => {
    switch (tx.type) {
        case 2:
        case 4:
            return transformTransfer(currencyService, tx);

        case 3:
            return transformIssue(currencyService, tx);

        case 5:
            return transformReissue(currencyService, tx);

        case 6:
            return tranformBurn(currencyService, tx);

        case 7:
            return transformExchange(currencyService, tx);

        case 8:
            return transformLease(currencyService, tx);

        case 9:
            return transformLeaseCancel(currencyService, tx);

        case 10:
            return transformAlias(currencyService, tx);

        case 11:
            return transformMassTransfer(currencyService, tx);

        default:
            return Promise.resolve(Object.assign({}, tx));
    }
};

const copyMandatoryAttributes = tx => ({
    id: tx.id,
    type: tx.type,
    timestamp: new DateTime(tx.timestamp),
    sender: tx.sender,
    height: tx.height
});

const loadAmountAndFeeCurrencies = (currencyService, amountAssetId, feeAssetId) => {
    return Promise.all([
        currencyService.get(amountAssetId),
        currencyService.get(feeAssetId)
    ]);
};

const transformMassTransfer = (currencyService, tx) => {
    return loadAmountAndFeeCurrencies(currencyService, tx.assetId, tx.feeAssetId).then(pair => {
        const amountCurrency = pair[0];
        const feeCurrency = pair[1];

        const transfers = tx.transfers.map(item => ({
            recipient: item.recipient,
            amount: Money.fromCoins(item.amount, amountCurrency)
        }));

        return Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, feeCurrency),
            attachment: tx.attachment,
            totalAmount: Money.fromCoins(tx.totalAmount, amountCurrency),
            transferCount: tx.transferCount,
            transfers
        });
    });
};

const transformAlias = (currencyService, tx, currentAddress) => {
    return Promise.resolve(
        Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            alias: tx.alias
        })
    );
};

const transformLease = (currencyService, tx) => {
    return currencyService.get(tx.feeAssetId).then(feeCurrency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            recipient: tx.recipient,
            fee: Money.fromCoins(tx.fee, feeCurrency),
            amount: Money.fromCoins(tx.amount, Currency.WAVES),
            status: tx.status
        })
    });
};

const transformLeaseCancel = (currencyService, tx) => {
    return currencyService.get(tx.feeAssetId).then(feeCurrency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, feeCurrency),
            leaseId: tx.leaseId,
            recipient: tx.lease.recipient
        });
    });
};

const transformExchange = (currencyService, tx) => {
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

        const price = OrderPrice.fromBackendPrice(tx.price, currencyPair);
        const amount = Money.fromCoins(tx.amount, currencyPair.amountAsset);

        return Object.assign(copyMandatoryAttributes(tx), {
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            buyFee: Money.fromCoins(tx.buyMatcherFee, Currency.WAVES),
            sellFee: Money.fromCoins(tx.sellMatcherFee, Currency.WAVES),
            price,
            amount,
            total: Money.fromTokens(price.toTokens() * amount.toTokens(), currencyPair.priceAsset),
            buyOrder: transformOrder(buyOrder, currencyPair),
            sellOrder: transformOrder(sellOrder, currencyPair),
            sender: sellOrder.sender,
            recipient: buyOrder.sender
        });
    });
};

const transformOrder = (order, assetPair) => {
    return {
        id: order.id,
        sender: order.sender,
        assetPair,
        orderType: order.orderType,
        amount: Money.fromCoins(order.amount, assetPair.amountAsset),
        price: OrderPrice.fromBackendPrice(order.price, assetPair),
        timestamp: new DateTime(order.timestamp),
        expiration: new DateTime(order.expiration),
        fee: Money.fromCoins(order.matcherFee, Currency.WAVES)
    };
};

const tranformBurn = (currencyService, tx) => {
    return currencyService.get(tx.assetId).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.amount, currency),
            fee: Money.fromCoins(tx.fee, Currency.WAVES)
        });
    });
};

const transformReissue = (currencyService, tx) => {
    return currencyService.get(tx.assetId).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.quantity, currency),
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            reissuable: tx.reissuable,

        });
    });
};

const transformIssue = (currencyService, tx) => {
    const c = Currency.fromIssueTransaction(tx);
    currencyService.put(c);

    return currencyService.get(c.id).then(currency => {
        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.quantity, currency),
            fee: Money.fromCoins(tx.fee, Currency.WAVES),
            name: tx.name,
            reissuable: tx.reissuable,
            decimals: tx.decimals,
            description: tx.description
        });
    });
};

const transformTransfer = (currencyService, tx) => {
    return loadAmountAndFeeCurrencies(currencyService, tx.assetId, tx.feeAssetId).then(pair => {
        const amountCurrency = pair[0];
        const feeCurrency = pair[1];

        return Object.assign(copyMandatoryAttributes(tx), {
            amount: Money.fromCoins(tx.amount, amountCurrency),
            fee: Money.fromCoins(tx.fee, feeCurrency),
            attachment: tx.attachment,
            recipient: tx.recipient
        });
    });
};


export class TransactionTransformerService {
    constructor(currencyService) {
        this.currencyService = currencyService;
    }

    transform = (input) => {
        if (Array.isArray(input))
            return transformMultiple(this.currencyService, input);

        return transformSingle(this.currencyService, input);
    };
}
