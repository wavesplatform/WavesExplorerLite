import React from 'react';
import PropTypes from 'prop-types';

import TransactionRef from '../../components/TransactionRef';
import TransactionArrow from '../../components/TransactionArrow';
import TransactionBadge from '../../components/TransactionBadge';
import {DirectionalEndpoints} from './DirectionalEndpoints.view';
import FailedBrick from "../../components/FailedBrick";

export class TransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    conventAmount = (v) => {
        if(!v) return null
        if(Array.isArray(v)) return v.map(({amount,currency}, i) => <p key={i} className="line">{amount} {currency}</p>)
        else return  <div className="line">{v.amount} {v.currency}</div>
    }

    render() {
        const {tx} = this.props;
        const rowClassName = tx.isSpam ? 'spam' : '';
        console.log(tx)
        return (
            <tr className={rowClassName}>
                <td data-label="ID / Type">
                    <div className="line no-wrap">
                        {tx.applicationStatus === "scriptExecutionFailed" && <FailedBrick/>}
                        <TransactionRef txId={tx.id}/>
                    </div>
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
                    {this.conventAmount(tx.in)}
                    {this.conventAmount(tx.out)}
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
