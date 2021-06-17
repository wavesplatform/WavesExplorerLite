import Money from '../../shared/Money';

// consider extracting to a module
const INCOMING = 'incoming';
const OUTGOING = 'outgoing';

const transactionMapper = (transactions, currentUser) => {
    return transactions.map(item => mapTransactionToPromise(item, currentUser));
};

const mapTransactionToPromise = (tx, currentUser) => {
    switch (tx.type) {
        case 1:
            return mapGenesis(tx, currentUser.address);

        case 2:
        case 4:
            return mapTransfer(tx, currentUser.address);

        case 3:
            return mapIssue(tx, currentUser.address);

        case 5:
            return mapReissue(tx, currentUser.address);

        case 6:
            return mapBurn(tx, currentUser.address);

        case 7:
            return mapExchange(tx, currentUser.address);

        case 8:
            return mapLease(tx, currentUser.address);

        case 9:
            return mapLeaseCancel(tx, currentUser.address);

        case 10:
            return mapAlias(tx, currentUser.address);

        case 11:
            return mapMassTransfer(tx, currentUser);

        case 16:
            return mapScriptInvocation(tx, currentUser.address);

        default:
            return Object.assign({}, tx);
    }
};

const copyMandatoryAttributes = tx => ({
    id: tx.id,
    type: tx.type,
    timestamp: tx.timestamp,
    sender: tx.sender,
    isSpam: tx.isSpam,
    transferCount: tx.transferCount
});

const defaultDirection = (tx, currentAddress) => {
    return tx.sender === currentAddress ? OUTGOING : null;
};

const moneyToObject = money => ({
    amount: money.formatAmount(true),
    currency: money.currency.toString()
});

const matchesUser = (currentUser, addressOrAlias) => {
    if (addressOrAlias === currentUser.address)
        return true;

    return !!currentUser.aliases[addressOrAlias];
};

const mapScriptInvocation = (tx, currentAddress) => {
    const tail = {
        recipient: tx.dappAddress,
        applicationStatus: tx.applicationStatus
    };
    const payment = tx.payment ?
        Array.isArray(tx.payment) ? tx.payment.map(v => moneyToObject(v)) :  [moneyToObject(tx.payment)]
        : null;
    if (tx.sender === currentAddress) {
        tail.direction = OUTGOING;
        tail.out = payment;
    } else {
        tail.direction = INCOMING;
        tail.in = payment;
    }

    return Object.assign(copyMandatoryAttributes(tx), tail);
};

const mapMassTransfer = (tx, currentUser) => {
    const tail = {};
    if (tx.transferCount) tail.transferCount = tx.transferCount
    if (matchesUser(currentUser, tx.sender)) {
        tail.direction = OUTGOING;
        tail.out = moneyToObject(tx.totalAmount);
    } else {
        tail.direction = INCOMING;
        tail.recipient = currentUser.address;

        let total = new Money(0, tx.totalAmount.currency);
        tx.transfers.filter(transfer => matchesUser(currentUser, transfer.recipient)).forEach(t => {
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
        recipient: tx.recipient,
        in: moneyToObject(tx.amount)
    });
};

const mapExchange = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        sender: tx.seller,
        recipient: tx.buyer,
        in: moneyToObject(tx.total),
        out: moneyToObject(tx.amount),
        applicationStatus: tx.applicationStatus,
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

const mapGenesis = (tx, currentAddress) => {
    const tail = {recipient: tx.recipient};
    const money = moneyToObject(tx.amount);

    if (tx.recipient === currentAddress) {
        tail.direction = INCOMING;
        tail.in = money;
    }

    return Object.assign(copyMandatoryAttributes(tx), tail);
};

const mapTransfer = (tx, currentAddress) => {
    const tail = {recipient: tx.recipient};
    const money = moneyToObject(tx.amount);

    if (tx.sender === currentAddress) {
        tail.direction = OUTGOING;
        tail.out = money;
    } else {
        tail.direction = INCOMING;
        tail.in = money;
    }

    return Object.assign(copyMandatoryAttributes(tx), tail);
};

export default transactionMapper;
