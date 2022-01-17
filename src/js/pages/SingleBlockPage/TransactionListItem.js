import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../../shared/DateTime';
import Timestamp from '../../components/Timestamp';
import EndpointRef from '../../components/EndpointRef';
import CurrencyRef from '../../components/CurrencyRef';
import TransactionRef from '../../components/TransactionRef';
import TransactionArrow from '../../components/TransactionArrow';
import {RoutedAssetRef} from "../../components/AssetRef/AssetRef.view";
import FailedBrick from "../../components/FailedBrick";


export const createListItem = (transaction, dApps) => {
    switch (transaction.type) {
        case 1:
            return <GenesisTransactionListItem key={transaction.id} tx={transaction}/>;

        case 2:
        case 4:
            return <TransferTransactionListItem key={transaction.id} tx={transaction}/>;

        case 3:
        case 5:
            return <IssueTransactionListItem key={transaction.id} tx={transaction}/>;

        case 6:
            return <BurnTransactionListItem key={transaction.id} tx={transaction}/>;

        case 7:
            return <ExchangeTransactionListItem key={transaction.id} tx={transaction}/>;

        case 8:
            return <LeasingTransactionListItem key={transaction.id} tx={transaction}/>;

        case 9:
            return <CancelLeasingTransactionListItem key={transaction.id} tx={transaction}/>;

        case 10:
            return <AliasTransactionListItem key={transaction.id} tx={transaction}/>;

        case 11:
            return <MassPaymentTransactionListItem key={transaction.id} tx={transaction}/>;

        case 12:
            return <DataTransactionListItem key={transaction.id} tx={transaction}/>;

        case 13:
            return <ScriptTransactionListItem key={transaction.id} tx={transaction}/>;

        case 14:
            return <SponsorshipTransactionListItem key={transaction.id} tx={transaction}/>;

        case 15:
            return <AssetScriptTransactionListItem key={transaction.id} tx={transaction}/>;

        case 16:
            return <ScriptInvocationTransactionListItem key={transaction.id} tx={transaction} dApps={dApps}/>;

        case 17:
            return <UpdateAssetInfoTransactionListItem key={transaction.id} tx={transaction}/>;

        default:
            return null;
    }
};

export class Line extends React.PureComponent {
    static propTypes = {
        wrap: PropTypes.bool,
        bold: PropTypes.bool
    };

    static defaultProps = {
        wrap: true,
        bold: false
    };

    render() {
        let className = 'line';
        if (!this.props.wrap)
            className += ' no-wrap';
        if (this.props.bold)
            className += ' bold';

        return <div className={className}>{this.props.children}</div>
    }
}

class IdAndTimestamp extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.instanceOf(DateTime).isRequired,
        applicationStatus: PropTypes.string
    };

    render() {
        return (
            <td data-label="ID / Timestamp">

                <Line wrap={false}>
                    {this.props.applicationStatus === 'script_execution_failed' && <FailedBrick/>}
                    <TransactionRef txId={this.props.id}/>
                </Line>

                <Line><label><Timestamp value={this.props.timestamp}/></label></Line>
            </td>
        );
    }
}

class Subjects extends React.PureComponent {
    static propTypes = {
        type: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        recipient: PropTypes.string,
    };

    render() {
        return (
            <td data-label="Sender / Recipient">
                <TransactionArrow type={this.props.type} direction="incoming"/>
                <Line wrap={false}>
                    <EndpointRef endpoint={this.props.sender} appearance="regular"/>
                </Line>
                <Line wrap={false}>
                    {this.props.recipient && <EndpointRef endpoint={this.props.recipient} appearance="regular"/>}
                </Line>
            </td>
        );
    }
}

class AmountAndFee extends React.PureComponent {

    render() {
        const {fee, amount} = this.props
        return (
            <td data-label="Amount / Fee">
                <Line>{Array.isArray(amount)
                    ? amount.map((v, i) => <p key={i}>{v.toString()}</p>)
                    : amount.toString()}
                </Line>
                <Line><label>{this.props.fee.toString()}</label></Line>
            </td>
        );
    }
}

class JustFee extends React.PureComponent {
    static propTypes = {
        fee: PropTypes.object
    };

    render() {
        return (
            <td data-label="Fee">
                <Line><label>{this.props.fee.toString()}</label></Line>
                <Line/>
            </td>
        );
    }
}

class GenesisTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;

        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type}/>
                    <Line wrap={false}>N/A</Line>
                    <Line wrap={false}><EndpointRef endpoint={tx.recipient} appearance="regular"/></Line>
                </td>
                <AmountAndFee amount={tx.amount} fee={tx.fee}/>
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.amount.currency}/></Line>
                </td>
            </tr>
        );
    }
}

class TransferTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';

        return (
            <tr className={rowClassName}>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender} recipient={tx.recipient}/>
                <AmountAndFee amount={tx.amount} fee={tx.fee}/>
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.amount.currency}/></Line>
                </td>
            </tr>
        );
    }
}

class ExchangeTransactionListItem extends React.PureComponent {
    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} applicationStatus={tx.applicationStatus}/>
                <td data-label="Seller / Buyer">
                    <div className="arrow exchange"></div>
                    <div className="line no-wrap"><EndpointRef endpoint={tx.seller} appearance="regular"/></div>
                    <div className="line no-wrap"><EndpointRef endpoint={tx.buyer} appearance="regular"/></div>
                </td>
                <td data-label="Amount / Total">
                    <div className="line">{tx.amount.toString()}</div>
                    <div className="line bold">{tx.total.toString()}</div>
                </td>
                <td data-label="Pair / Price">
                    <div className="line">
                        <CurrencyRef currency={tx.price.amountAsset}/> / <CurrencyRef currency={tx.price.priceAsset}/>
                    </div>
                    <div className="line bold">{tx.price.toString()}</div>
                </td>
            </tr>
        );
    }
}

class LeasingTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender} recipient={tx.recipient}/>
                <AmountAndFee amount={tx.amount} fee={tx.fee}/>
            </tr>
        );
    }
}

class CancelLeasingTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>

                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <AmountAndFee amount={tx.amount} fee={tx.fee}/>

            </tr>
        );
    }
}

class IssueTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type}/>
                    <Line wrap={false}><EndpointRef endpoint={tx.sender} appearance="regular"/></Line>
                    <Line wrap={false}>
                        {tx.assetId && <RoutedAssetRef assetId={tx.assetId}/>}
                    </Line>
                </td>
                <AmountAndFee amount={tx.amount} fee={tx.fee}/>
                <td>
                    <Line bold={true}>
                        {tx.assetId ? <RoutedAssetRef text={tx.name} assetId={tx.assetId}/> : tx.name}
                    </Line>
                </td>
            </tr>
        );
    }
}

class BurnTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <AmountAndFee amount={tx.amount} fee={tx.fee}/>
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.amount.currency}/></Line>
                </td>
            </tr>
        );
    }
}

class AliasTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <JustFee fee={tx.fee}/>
                <td data-label="Price">
                    <Line bold={true}>{tx.alias}</Line>
                </td>
            </tr>
        );
    }
}

class MassPaymentTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';

        return (
            <tr className={rowClassName}>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type}/>
                    <Line>{tx.transferCount} recipients</Line>
                    <Line wrap={false}><EndpointRef endpoint={tx.sender} appearance="regular"/></Line>
                </td>
                <AmountAndFee amount={tx.totalAmount} fee={tx.fee}/>
                <td data-label="Price">
                    <Line><CurrencyRef currency={tx.totalAmount.currency}/></Line>
                </td>
            </tr>
        );
    }
}

class DataTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <JustFee fee={tx.fee}/>
            </tr>
        );
    }
}

class ScriptTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <JustFee fee={tx.fee}/>
            </tr>
        );
    }
}

class SponsorshipTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <JustFee fee={tx.fee}/>
                <td data-label="Price">
                    {tx.sponsoredFee && <Line>{tx.sponsoredFee.toString()}</Line>}
                </td>
            </tr>
        );
    }
}

class AssetScriptTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <Subjects type={tx.type} sender={tx.sender}/>
                <JustFee fee={tx.fee}/>
            </tr>
        );
    }
}

class ScriptInvocationTransactionListItem extends React.Component {
    static propTypes = {
        tx: PropTypes.object.isRequired,
        dApps: PropTypes.object,
    };

    render() {
        const {tx, dApps} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} applicationStatus={tx.applicationStatus}/>
                <td data-label="Sender / DApp">
                    <TransactionArrow type={tx.type}/>
                    <Line wrap={false}>
                        <EndpointRef endpoint={tx.sender} appearance="regular"/>
                    </Line>
                    <Line wrap={false}>
                        {tx.dappAddress && <div style={{display: 'flex', alignItems: 'center'}}>
                            {dApps[tx.dappAddress] ? <div>
                                <div className="badge dapp-link">
                                    <EndpointRef endpoint={tx.sender} title={dApps[tx.dappAddress]}
                                                 appearance="regular"/>
                                </div>
                            </div> : <EndpointRef endpoint={tx.dappAddress} appearance="regular"/>}
                        </div>}
                    </Line>
                </td>
                {tx.payment ? <AmountAndFee amount={tx.payment} fee={tx.fee}/> : <JustFee fee={tx.fee}/>}
                <td data-label="Function name">
                    <div className="line" title={tx.call.function} style={{textOverflow:'ellipsis', overflow: 'hidden'}}>
                        {tx.call.function}
                    </div>
                </td>
            </tr>
        );
    }
}

class UpdateAssetInfoTransactionListItem extends React.Component {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp}/>
                <td data-label="Sender / Asset ID">
                    <Line wrap={false}>
                        <EndpointRef endpoint={tx.sender} appearance="regular"/>
                    </Line>
                    <Line wrap={false}>
                        <EndpointRef endpoint={tx.assetId} appearance="regular" type={'asset'}/>
                    </Line>
                </td>
                <JustFee fee={tx.fee}/>
                <td data-label="Asset name"><Line>
                    <RoutedAssetRef assetId={tx.assetId} text={tx.assetName}/>
                </Line></td>
            </tr>
        );
    }
}
