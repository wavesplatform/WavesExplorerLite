import React from 'react';

import AddressRef from '../shared/AddressRef';
import TransactionBadge from '../shared/TransactionBadge';
import TransactionRef from '../shared/TransactionRef';
import BlockRef from '../shared/BlockRef';

import Description from './Description';

const transactionToDictionary = (tx) => {
    switch (tx.type) {
        case 2:
        case 4:
            return transferTransactionToItems(tx);

        case 3:
            return issueTransactionToItems(tx);

        case 5:
            return reissueTransactionToItems(tx);

        case 6:
            return burnTransactionToItems(tx);

        case 7:
            return exchangeTransactionToItems(tx);

        case 8:
            return leaseTransactionToItems(tx);

        case 9:
            return cancelLeaseTransactionItems(tx);

        case 10:
            return aliasTransactionToItems(tx);

        case 11:
            return massPaymentTransactionToItems(tx);

        case 12:
        case 13:
        case 14:
        default:
            return [];
    }
};

const aliasTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Alias',
            value: <Description text={tx.alias} />
        },
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const cancelLeaseTransactionItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        {
            label: 'Lease',
            value: <TransactionRef txId={tx.leaseId} />
        },
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const leaseTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildAmountItem(tx),
        buildFeeItem(tx),
        buildRecipientItem(tx),
        buildSenderItem(tx),
        {
            label: 'Status',
            value: tx.status
        }
    ];
};

const reissueTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildQuantityItem(tx),
        buildReissuableItem(tx),
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const issueTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildQuantityItem(tx),
        {
            label: 'Decimals',
            value: tx.decimals
        },
        buildDescriptionItem(tx),
        buildReissuableItem(tx),
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const burnTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildAmountItem(tx),
        buildFeeItem(tx)
    ];
};

const transferTransactionToItems = tx => {
    return [
        ...buildTransactionHeaderItems(tx),
        buildRecipientItem(tx),
        buildAmountItem(tx),
        buildFeeItem(tx),
        buildAttachmentItem(tx),
        buildSenderItem(tx)
    ];
};

const exchangeTransactionToItems = tx => {
    const items = [{
        label: 'Price',
        value: tx.price.toString()
    }, {
        label: 'Total',
        value: tx.total.toString()
    }];

    return [
        ...buildTransactionHeaderItems(tx),
        buildFeeItem(tx),
        buildAmountItem(tx),
        ...items,
        buildSenderItem(tx),
        buildRecipientItem(tx)
    ];
};

const massPaymentTransactionToItems = tx => {
    const items = [{
        label: 'Total amount',
        value: tx.totalAmount.toString()
    }, {
        label: 'Transfers count',
        value: tx.transferCount,
    }];

    return [
        ...buildTransactionHeaderItems(tx),
        ...items,
        buildAttachmentItem(tx),
        buildFeeItem(tx),
        buildSenderItem(tx)
    ];
};

const buildDescriptionItem = tx => ({
    label: 'Description',
    value: <Description text={tx.description}/>
});

const buildAttachmentItem = tx => ({
    label: 'Attachment',
    value: <Description text={tx.attachment} />
});

const buildTransactionHeaderItems = tx => {
    return [{
        label: 'Type',
        value: <React.Fragment><span>{tx.type}</span><TransactionBadge type={tx.type} /></React.Fragment>
    }, {
        label: 'Timestamp',
        value: tx.timestamp.toLongString(),
    }, {
        label: 'Block',
        value: <BlockRef height={tx.height} />
    }];
};

const buildQuantityItem = tx => ({
    label: 'Quantity',
    value: tx.amount.toString()
});

const buildReissuableItem = tx => ({
    label: 'Reissuable',
    value: tx.reissuable
});

const buildRecipientItem = tx => ({
    label: 'Recipient',
    value: <AddressRef address={tx.recipient} />
});

const buildSenderItem = tx => ({
    label: 'Sender',
    value: <AddressRef address={tx.sender} />
});

const buildFeeItem = tx => ({
    label: 'Fee',
    value: tx.fee.toString()
});

const buildAmountItem = tx => ({
    label: 'Amount',
    value: tx.amount.toString()
});

export default transactionToDictionary;
