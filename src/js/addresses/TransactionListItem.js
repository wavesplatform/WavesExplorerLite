import React from 'react';
import PropTypes from 'prop-types';

import TransactionRef from '../shared/TransactionRef';
import DirectionalEndpoints from './DirectionalEndpoints';
import TransactionArrow from '../shared/TransactionArrow';
import TransactionBadge from '../shared/TransactionBadge';

export default class TransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';

        return (
            <tr className={rowClassName}>
                <td data-label="ID / Type">
                    <div className="line no-wrap"><TransactionRef txId={tx.id}/></div>
                    <div className="line no-wrap"><TransactionBadge type={tx.type} direction={tx.direction}/></div>
                </td>
                <td data-label="Timestamp" className="timestamp">
                    <div className="line"><label>{tx.timestamp.date}</label></div>
                    <div className="line"><label>{tx.timestamp.time}</label></div>
                </td>
                <td data-label="Sender / Receiver">
                    <TransactionArrow type={tx.type} direction={tx.direction} />
                    <DirectionalEndpoints direction={tx.direction} sender={tx.sender} recipient={tx.recipient} />
                </td>
                <td data-label="Amount in / out">
                    {tx.in && <div className="line">{tx.in.amount} {tx.in.currency}</div>}
                    {tx.out && <div className="line">{tx.out.amount} {tx.out.currency}</div>}
                </td>
                <td data-label="Price">
                    {tx.price && <React.Fragment>
                        <div className="line">{tx.price.amount}</div>
                        <div className="line"><label>{tx.price.currency}</label></div>
                    </React.Fragment>}
                </td>
            </tr>
        );
    }
}
