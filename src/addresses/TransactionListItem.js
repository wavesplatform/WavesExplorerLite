import React from 'react';
import PropTypes from 'prop-types';

import Address from './Address';
import TransactionRef from '../shared/TransactionRef';
import {typeToTitle} from '../shared/TransactionTypes';
import TransactionArrow from '../shared/TransactionArrow';

export default class TransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        const rowClassName = tx.spam ? "spam" : "";

        return (
            <tr className={rowClassName}>
                <td data-label="ID / Type">
                    <div className="line no-wrap"><TransactionRef txId={tx.id}/></div>
                    <div className="line"><label>{typeToTitle(tx.type)}</label></div>
                </td>
                <td data-label="Timestamp" className="timestamp">
                    <div className="line"><label>{tx.date}</label></div>
                    <div className="line"><label>{tx.time}</label></div>
                </td>
                <td data-label="Sender / Receiver">
                    <TransactionArrow type={tx.type} />
                    <div className="line no-wrap"><Address address={tx.sender} /></div>
                    <div className="line no-wrap"><Address address={tx.recipient} /></div>
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
