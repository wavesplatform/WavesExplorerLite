import sumBy from 'lodash/sumBy';
import DateTime from '../shared/DateTime';

// consider extracting to a module
const INCOMING = 'incoming';
const OUTGOING = 'outgoing';

const transactionMapper = (tx, currentAddress) => {
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
            return tx;
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

const mapMassTransfer = (tx, currentAddress) => {
    const tail = {};
    if (tx.sender === currentAddress) {
        tail.direction = OUTGOING;
        tail.out = {
            amount: tx.totalAmount,
            currency: ''
        }
    } else {
        tail.direction = INCOMING;
        tail.recipient = currentAddress;
        const amount = sumBy(tx.transfers.filter(transfer => transfer.recipient === currentAddress), 'amount');
        tail.in = {
            amount,
            currency: ''
        }
    }

    return Object.assign(copyMandatoryAttributes(tx), tail);
};

const mapAlias = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress)
    });
};

const mapLease = (tx, currentAddress) => {
    const money = {
        amount: tx.amount,
        currency: 'WAVES'
    };

    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        recipient: tx.recipient,
        out: money
    });
};

const mapLeaseCancel = (tx, currentAddress) => {
    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        recipient: tx.lease.recipient
    });
};

const mapExchange = (tx, currentAddress) => {
    const buyOrder = tx.order1.orderType === 'buy' ? tx.order1 : tx.order2;
    const sellOrder = tx.order2.orderType === 'sell' ? tx.order2 : tx.order1;

    return Object.assign(copyMandatoryAttributes(tx), {
        sender: sellOrder.sender,
        recipient: buyOrder.sender,
        in: {
            amount: buyOrder.amount,
            currency: ''
        },
        out: {
            amount: sellOrder.amount,
            currency: ''
        },
        price: {
            amount: tx.price,
            currency: ''
        }
    });
};

const mapBurn = (tx, currentAddress) => {
    const money = {
        amount: tx.amount,
        currency: ''
    };

    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        out: money
    });
};

const mapReissue = (tx, currentAddress) => {
    const money = {
        amount: tx.quantity,
        currency: ''
    };

    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        out: money
    });
};

const mapIssue = (tx, currentAddress) => {
    const money = {
        amount: tx.quantity,
        currency: tx.name
    };

    return Object.assign(copyMandatoryAttributes(tx), {
        direction: defaultDirection(tx, currentAddress),
        out: money
    });
};

const mapTransfer = (tx, currentAddress) => {
    const tail = {recipient: tx.recipient};
    const money = {
        amount: tx.amount,
        currency: ''
    };

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
