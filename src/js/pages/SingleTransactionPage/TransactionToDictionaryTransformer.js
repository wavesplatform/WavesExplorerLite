import React from 'react';

import {TOOLTIP_ID, VostokToWavesEnterprise} from '../../shared/constants';
import EndpointRef from '../../components/EndpointRef';
import CurrencyRef from '../../components/CurrencyRef';
import TransactionBadge from '../../components/TransactionBadge';
import TransactionRef from '../../components/TransactionRef';
import BlockRef from '../../components/BlockRef';
import Spacer from '../../components/Spacer';
import ScriptInfo from '../../components/ScriptInfo';
import Timestamp from '../../components/Timestamp';
import DataInfo from '../../components/DataInfo';
import MoneyInfo from '../../components/MoneyInfo';
import InvocationInfo from '../../components/InvocationInfo';
import {Description} from './Description.view';
import RawJsonViewer from "./RawJsonViewer";
import {Line} from "../SingleBlockPage/TransactionListItem";
import {RoutedAssetRef} from "../../components/AssetRef/AssetRef.view";
import {AddressRef} from "../../components/EndpointRef/AddressRef.view";
import brick from "../../../images/brick.svg";
import pending from "../../../images/pending.svg";
import ServiceFactory from "../../services/ServiceFactory";


const transactionToDictionary = (tx, networkId) => {
    switch (tx.type) {
        case 1:
            return genesisTransactionToItems(tx);

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
            return dataTransactionToItems(tx);

        case 13:
            return scriptTransactionToItems(tx);

        case 14:
            return sponsorshipTransactionToItems(tx);

        case 15:
            return assetScriptTransactionToItems(tx);

        case 16:
            return scriptInvocationTransactionToItems(tx, networkId);

        case 17:
            return updateAssetInfoTransactionToItems(tx);

        case 18:
            return continuationToItems(tx, networkId);

        default:
            return {
                default: []
            };
    }
};

const InfoWrapper = ({children}) => (
    <div className="label-with-icon">
        {children}
        <div className="icon info" data-for={TOOLTIP_ID}
             data-tip="Token information has been changed due to the copyright owner request"/>
    </div>
);

const scriptInvocationTransactionToItems = (tx, networkId) => {
    const paymentItems = [{
        label: 'Payments',
        value: tx.payment && tx.payment.length > 0
            ? <div style={{display: 'flex', flexDirection: 'column', height: 60, justifyContent: 'space-around'}}>
                {tx.payment.map((v, i) => <MoneyInfo key={i} value={v}/>)}
            </div>
            : ''
    }];
    const stateItems = tx.stateChanges ? [{
        label: 'State Changes',
        value: <RawJsonViewer json={tx.stateChanges}/>
    }] : [];

    const getDataEntryType = (type) => {
        switch (type) {
            case "binary":
                return "BinaryEntry";
            case "integer":
                return "IntegerEntry";
            case "string":
                return "StringEntry";
            case "boolean":
                return "BooleanEntry";
            default:
                return "DeleteEntry"
        }
    }
    const results = [{
        label: 'Results',
        value: <>
            {tx.stateChanges && (tx.stateChanges.errorMessage || tx.stateChanges.error) &&
            <div className="data-container">
                {`Error code: ${(tx.stateChanges.errorMessage || tx.stateChanges.error).code}`}<br/><br/>
                {`Cause: ${(tx.stateChanges.errorMessage || tx.stateChanges.error).text}`}
            </div>}
            <table>
                <tbody>
                {tx.stateChanges && tx.stateChanges.transfers && tx.stateChanges.transfers
                    .map(({address, money}, i) => <tr key={i}>
                        <td style={{width: 100}}><Line bold>Transfer</Line></td>
                        <td><MoneyInfo key={i} value={money}/></td>
                        <td>{address ? <AddressRef networkId={networkId} address={address}/> : ''}</td>
                    </tr>)
                }
                {tx.stateChanges && (tx.stateChanges.issues || [])
                    .map(({money, isReissuable, compiledScript}, i) => <tr key={i}>
                        <td><Line bold>Issue</Line></td>
                        <td><MoneyInfo key={i} value={money}/></td>
                        <td>
                            <Line>Reissuable:&nbsp;{isReissuable ? "true" : "false"}</Line>
                            <Line>Scripted:&nbsp;{compiledScript ? "true" : "false"}</Line>
                        </td>
                    </tr>)
                }
                {tx.stateChanges && (tx.stateChanges.reissues || [])
                    .map(({money, isReissuable}, i) => <tr key={i}>
                        <td><Line bold>Reissue</Line></td>
                        <td><MoneyInfo key={i} value={money}/></td>
                        <td><Line>Reissuable:&nbsp;{isReissuable ? "true" : "false"}</Line></td>
                    </tr>)
                }
                {tx.stateChanges && (tx.stateChanges.burns || [])
                    .map(({money}, i) => <tr key={i}>
                        <td><Line bold>Burn</Line></td>
                        <td><MoneyInfo key={i} value={money}/></td>
                    </tr>)
                }
                {tx.stateChanges && (tx.stateChanges.data || [])
                    .map((entry, i) => <tr key={i}>
                        <td><Line bold>{getDataEntryType(entry.type)}</Line></td>
                        <td>
                            <Line wrap={false}>key: {entry.key}</Line>
                        </td>
                        {entry.value && <td>
                            <Line wrap={false}>value: {String(entry.value)}</Line>
                        </td>}
                    </tr>)
                }
                </tbody>
            </table>
        </>
    }];

    const result = {
        default: [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'DApp Address',
                value: <EndpointRef endpoint={tx.dappAddress}/>
            }, {
                label: 'Call',
                value: <InvocationInfo {...tx.call} />
            },
            ...paymentItems,
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx),
            ...stateItems,
            ...results
        ]
    }
    return tx.version > 2
        ? {
            default: [
                ...buildTransactionHeaderItems(tx),
                {
                    label: 'DApp Address',
                    value: <EndpointRef endpoint={tx.dappAddress}/>
                }, {
                    label: 'Call',
                    value: <InvocationInfo {...tx.call} />
                },
                ...paymentItems,
                buildFeeItem(tx),
                {
                    label: 'ExtraFeePerStep',
                    value: <MoneyInfo value={tx.extraFeePerStep}/>
                },
                ...buildSenderAddressAndKeyItems(tx),
                {
                    label: 'ContinuationTxs',
                    value: !!tx.continuationTransactionIds
                        ? tx.continuationTransactionIds.map(id => <TransactionRef txId={id}/>)
                        : null
                },
                ...stateItems,
                ...results
            ]
        }
        : result
};

const updateAssetInfoTransactionToItems = tx => ({
    default: [
        ...buildTransactionHeaderItems(tx),
        {label: 'Asset', value: <RoutedAssetRef assetId={tx.assetId}/>},
        {label: 'Name', value: tx.assetName},
        {label: 'Description', value: tx.description},
        buildFeeItem(tx),
        ...buildSenderAddressAndKeyItems(tx),
    ]
});

const continuationToItems = tx => ({
    default: [
        {
            label: 'Type',
            value: <React.Fragment><span>{tx.type}</span><Spacer size={14}/><TransactionBadge
                type={tx.type}/></React.Fragment>
        },
        buildVersionItem(tx),
        {
            label: 'Status',
            value: tx.applicationStatus === 'script_execution_failed' ?
                <><img src={brick} height={12} width={12}/>&nbsp;Script execution failed</>
                : 'Succeed'
        },
        {
            label: 'Tx Id',
            value: tx.id
        },
        {
            label: 'Block',
            value: <BlockRef height={tx.height}/>
        },
        {
            label: 'Nonce',
            value: tx.nonce
        },
        {
            label: 'InvokeScript Transaction Id',
            value: <TransactionRef txId={tx.invokeScriptTransactionId}/>
        },
        buildFeeItem(tx),
    ]
})

const dataTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'Data',
                value: <DataInfo data={tx.data}/>
            },
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const scriptTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            buildScriptItem(tx),
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const sponsorshipTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'Sponsored Fee',
                value: tx.sponsoredFee ? tx.sponsoredFee.toString() : 'Cancelled'
            }, {
                label: 'Transaction Fee',
                value: tx.fee.toString()
            },
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const assetScriptTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'Asset',
                value: <CurrencyRef currency={tx.asset}/>
            },
            buildScriptItem(tx),
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const aliasTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'Alias',
                value: <Description text={tx.alias}/>
            },
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const cancelLeaseTransactionItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            {
                label: 'Lease',
                value: <TransactionRef txId={tx.leaseId}/>
            },
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const leaseTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            buildAmountItem(tx),
            buildFeeItem(tx),
            buildRecipientItem(tx),
            ...buildSenderAddressAndKeyItems(tx),
            {
                label: 'Status',
                value: tx.status
            }
        ]
    };
};

const reissueTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            buildQuantityItem(tx),
            buildReissuableItem(tx),
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const issueTransactionToItems = tx => {
    const scriptItems = tx.script ? [buildScriptItem(tx)] : [];

    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            {label: 'AssetId', value: <RoutedAssetRef assetId={tx.assetId}/>},
            buildQuantityItem(tx),
            {
                label: 'Decimals',
                value: tx.decimals
            },
            buildDescriptionItem(tx),
            buildReissuableItem(tx),
            ...scriptItems,
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const burnTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            buildAmountItem(tx),
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const genesisTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            buildRecipientItem(tx),
            buildAmountItem(tx),
            buildFeeItem(tx)
        ]
    };
};

const transferTransactionToItems = tx => {
    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            buildRecipientItem(tx),
            buildAmountItem(tx),
            buildFeeItem(tx),
            buildAttachmentItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const exchangeTransactionToItems = tx => {
    const assetPair = tx.buyOrder.assetPair;

    const items = [{
        label: 'Price',
        value: tx.price.toString()
    }, {
        label: 'Total',
        value: <MoneyInfo value={tx.total}/>
    }];

    const feeItems = [
        buildFeeItem(tx),
        {
            label: 'Buy Matcher Fee',
            value: <MoneyInfo value={tx.buyFee}/>
        }, {
            label: 'Sell Matcher Fee',
            value: <MoneyInfo value={tx.sellFee}/>
        }];

    const headerItems = buildTransactionHeaderItems(tx);
    headerItems.splice(1, 0, {
        label: 'Pair',
        value: <React.Fragment><CurrencyRef currency={assetPair.amountAsset}/> / <CurrencyRef
            currency={assetPair.priceAsset}/></React.Fragment>
    });

    return {
        default: [
            ...headerItems,
            ...buildSenderAddressAndKeyItems(tx),
            buildAmountItem(tx),
            ...items,
            ...feeItems
        ],
        ['Buy Order']: [...buildOrderItems(tx.buyOrder)],
        ['Sell Order']: [...buildOrderItems(tx.sellOrder)]
    };
};

const massPaymentTransactionToItems = tx => {
    const items = [{
        label: 'Total amount',
        value: <MoneyInfo value={tx.totalAmount}/>
    }, {
        label: 'Transfers count',
        value: tx.transferCount,
    }];

    return {
        default: [
            ...buildTransactionHeaderItems(tx),
            ...items,
            buildAttachmentItem(tx),
            buildFeeItem(tx),
            ...buildSenderAddressAndKeyItems(tx)
        ]
    };
};

const buildOrderItems = order => {
    return [{
        label: 'Order Id',
        value: order.id
    },
        buildTimestampItem(order.timestamp),
        buildAmountItem(order),
        {
            label: 'Price',
            value: order.price.toString()
        },
        buildSenderItem(order),
        {
            label: 'Matcher Fee',
            value: <MoneyInfo value={order.fee}/>
        }
    ];
};

const buildScriptItem = tx => ({
    label: 'Script',
    value: <ScriptInfo script={tx.script}/>
});

const buildDescriptionItem = tx => {
    let value = <Description text={tx.description}/>;
    if (tx.id === VostokToWavesEnterprise.id) {
        value = <InfoWrapper>{value}</InfoWrapper>;
    }

    return {
        label: 'Description',
        value
    };
};

const buildAttachmentItem = tx => ({
    label: 'Attachment',
    value: <Description text={tx.attachment}/>
});

const buildTimestampItem = timestamp => ({
    label: 'Timestamp',
    value: <Timestamp value={timestamp}/>
});

const buildTransactionHeaderItems = tx => {
    return [{
        label: 'Type',
        value: <React.Fragment><span>{tx.type}</span><Spacer size={14}/><TransactionBadge
            type={tx.type}/></React.Fragment>
    }, {
        label: 'Status',
        value: tx.applicationStatus === 'script_execution_failed'
            ? <><img src={brick} height={12} width={12}/>&nbsp;Script execution failed</>
            : tx.applicationStatus === 'script_execution_in_progress'
                ? <><img src={pending} height={12} width={12}/>&nbsp;Script execution in progress</>
                : 'Succeeded'
    }, buildVersionItem(tx), buildTimestampItem(tx.timestamp), {
        label: 'Block',
        value: <BlockRef height={tx.height}/>
    }, buildProofsItem(tx)];
};

const buildVersionItem = tx => ({
    label: 'Version',
    value: tx.version
});

const buildSenderAddressAndKeyItems = tx => ([
    buildSenderItem(tx),
    buildSenderPublicKeyItem(tx)
]);

const buildQuantityItem = tx => {
    let value = tx.amount.toString();
    if (tx.id === VostokToWavesEnterprise.id) {
        value = <InfoWrapper>{value}</InfoWrapper>
    }

    return {
        label: 'Quantity',
        value
    };
};

const buildProofsItem = tx => ({
    label: 'Proofs',
    value: tx.proofs.join(' ')
});

const buildReissuableItem = tx => ({
    label: 'Reissuable',
    value: (!!tx.reissuable).toString()
});

const buildRecipientItem = tx => ({
    label: 'Recipient',
    value: <EndpointRef endpoint={tx.recipient}/>
});

const buildSenderItem = tx => ({
    label: 'Sender',
    value: <EndpointRef endpoint={tx.sender}/>
});

const buildSenderPublicKeyItem = tx => ({
    label: 'Sender PublicKey',
    value: tx.senderPublicKey
});

const buildFeeItem = tx => ({
    label: 'Fee',
    value: <MoneyInfo value={tx.fee}/>
});

const buildAmountItem = tx => ({
    label: 'Amount',
    value: <MoneyInfo value={tx.amount}/>
});

export default transactionToDictionary;
