import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../shared/DateTime';
import AddressRef from '../shared/AddressRef';
import TransactionRef from '../shared/TransactionRef';
import TransactionArrow from '../shared/TransactionArrow';

export const createListItem = (transaction) => {
    switch (transaction.type) {
        case 2:
        case 4:
            return <TransferTransactionListItem key={transaction.id} tx={transaction} />;

        case 3:
        case 5:
            return <IssueTransactionListItem key={transaction.id} tx={transaction} />;

        case 6:
            return <BurnTransactionListItem key={transaction.id} tx={transaction} />;

        case 7:
            return <ExchangeTransactionListItem key={transaction.id} tx={transaction} />;

        case 8:
            return <LeasingTransactionListItem key={transaction.id} tx={transaction} />;

        case 9:
            return <CancelLeasingTransactionListItem key={transaction.id} tx={transaction} />;

        case 10:
            return <AliasTransactionListItem key={transaction.id} tx={transaction} />;

        case 11:
            return <MassPaymentTransactionListItem key={transaction.id} tx={transaction} />;

        default:
            return null;
    }
};

class Line extends React.PureComponent {
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
        timestamp: PropTypes.instanceOf(DateTime).isRequired
    };

    render() {
        return (
            <td data-label="ID / Timestamp">
                <Line wrap={false}><TransactionRef txId={this.props.id}/></Line>
                <Line><label>{this.props.timestamp.toLongString()}</label></Line>
            </td>
        );
    }
}

class Subjects extends React.PureComponent {
    static propTypes = {
        type: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        recipient: PropTypes.string
    };

    render() {
        return (
            <td data-label="Sender / Recipient">
                <TransactionArrow type={this.props.type} />
                <Line wrap={false}><AddressRef address={this.props.sender} appearance="regular"/></Line>
                <Line wrap={false}>
                    {this.props.recipient && <AddressRef address={this.props.recipient} appearance="regular"/>}
                </Line>
            </td>
        );
    }
}

class AmountAndFee extends React.PureComponent {
    static propTypes = {
        amount: PropTypes.number,
        fee: PropTypes.number
    };

    render() {
        return (
            <td data-label="Amount / Fee">
                <Line>{this.props.amount}</Line>
                <Line><label>{this.props.fee} WAVES</label></Line>
            </td>
        );
    }
}

class TransferTransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} recipient={tx.recipient} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
                <td data-label="Price">
                    <Line><a>XDTC</a></Line>
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
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <td data-label="Seller / Buyer">
                    <div className="arrow exchange"></div>
                    <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                              appearance="regular"/></div>
                    <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                              appearance="regular"/></div>
                </td>
                <td data-label="Amount / Total">
                    <div className="line">7.69536906</div>
                    <div className="line bold">406.70541687</div>
                </td>
                <td data-label="Pair / Price">
                    <div className="line"><a>ZEC</a> / WAVES</div>
                    <div className="line bold">53.24051565</div>
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
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} recipient={tx.recipient} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
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
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
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
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type} />
                    <Line wrap={false}><AddressRef address={tx.sender} appearance="regular"/></Line>
                    <Line wrap={false}>
                        <TransactionRef txId={tx.assetId}/>
                    </Line>
                </td>
                <td data-label="Amount / Fee">
                    <Line>{tx.quantity}</Line>
                    <Line><label>{tx.fee} WAVES</label></Line>
                </td>
                <td>
                    <Line bold={true}>{tx.name}</Line>
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
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} />
                <AmountAndFee amount={tx.amount} fee={tx.fee} />
                <td data-label="Price">
                    <Line><a>XDTC</a></Line>
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
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <Subjects type={tx.type} sender={tx.sender} />
                <td data-label="Amount / Fee">
                    <Line />
                    <Line><label>{tx.fee} WAVES</label></Line>
                </td>
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
        return (
            <tr>
                <IdAndTimestamp id={tx.id} timestamp={tx.timestamp} />
                <td data-label="Sender / Recipient">
                    <TransactionArrow type={tx.type} />
                    <Line wrap={false}><AddressRef address={tx.sender} appearance="regular"/></Line>
                    <Line>{tx.transferCount}</Line>
                </td>
                <AmountAndFee amount={tx.totalAmount} fee={tx.fee} />
                <td data-label="Price">
                    <Line><a>XDTC</a></Line>
                </td>
            </tr>
        );
    }
}
