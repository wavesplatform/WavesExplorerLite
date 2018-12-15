import Money from '../shared/Money';

// consider extracting to a module
const INCOMING = 'incoming';
const OUTGOING = 'outgoing';

const transactionMapper = (transactions, currentAddress) => {
    return transactions.map(item => mapTransactionToPromise(item, currentAddress));
};

const mapTransactionToPromise = (tx, currentAddress) => {
    switch (tx.type) {
        case 2:
        case 4:
            return mapTransfer(tx, currentAddress);

        case 3:
            return mapIssue(tx, currentAddress);

        case 5:
            return mapReissue(tx, currentAddress);

        case 6:
            return mapBurn(tx, currentAddress);

        case 7:
            return mapExchange(tx, currentAddress);

        case 8:
            return mapLease(tx, currentAddress);

        case 9:
            return mapLeaseCancel(tx, currentAddress);

        case 10:
            return mapAlias(tx, currentAddress);

        case 11:
            return mapMassTransfer(tx, currentAddress);

        default:
            return Object.assign({}, tx);
    }
};

const copyMandatoryAttributes = tx => ({
    id: tx.id,
    type: tx.type,
    timestamp: tx.timestamp,
    sender: tx.sender
});

const defaultDirection = (tx, currentAddress) => {
    return tx.sender === currentAddress ? OUTGOING : null;
};

const moneyToObject = money => ({
    amount: money.formatAmount(true),
    currency: money.currency.toString()
});

const mapMassTransfer = (tx, currentAddress) => {
    const tail = {};
    if (tx.sender === currentAddress) {
        tail.direction = OUTGOING;
        tail.out = moneyToObject(tx.totalAmount);
    } else {
        tail.direction = INCOMING;
        tail.recipient = currentAddress;

        let total = new Money(0, tx.totalAmount.currency);
        tx.transfers.filter(transfer => transfer.recipient === currentAddress).forEach(t => {
            total = total.plus(t.amount);
        });

        tail.in = moneyToObject(total);
    }

    return Object.assign(copyMandatoryAttributes(tx), tail);
};

const mapAlias = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress)
    });
};

const mapLease = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        recipient: tx.recipient,
        out: moneyToObject(tx.amount)
    });
};

const mapLeaseCancel = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        recipient: tx.recipient
    });
};

const mapExchange = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        sender: tx.sender,
        recipient: tx.recipient,
        in: moneyToObject(tx.total),
        out: moneyToObject(tx.amount),
        price: {
            amount: tx.price.toTokens().toFixed(8),
            currency: tx.buyOrder.assetPair.priceAsset.toString()
        }
    });
};

const mapBurn = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        out: moneyToObject(tx.amount)
    });
};

const mapReissue = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        out: moneyToObject(tx.amount)
    });
};

const mapIssue = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        out: moneyToObject(tx.amount)
    });
};

const mapTransfer = (tx, currentAddress) => {
    const tail = {recipient: tx.recipient};
    const money = moneyToObject(tx.amount);

    if (tx.recipient === currentAddress) {
        tail.direction = INCOMING;
        tail.in = money;
    } else {
        tail.direction = OUTGOING;
        tail.out = money;
    }

    return Object.assign(copyMandatoryAttributes(tx), tail);
};

export default transactionMapper;
