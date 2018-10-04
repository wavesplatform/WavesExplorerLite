import React from 'react';
import PropTypes from 'prop-types';

import Address from './Address';
import TransactionRef from '../shared/TransactionRef';

const typeMapping = {
    2: {title: 'Payment', className: 'arrow-transaction-payment'},
    7: {title: 'Exchange', className: 'arrow-transaction-exchange'},
    11: {title: 'Mass payment', className: 'arrow-transaction-masspay'}
};


export default class TransactionListItem extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    typeToLabel = type => {
        const mapping = typeMapping[type];

        if (!mapping)
            return '';

        return mapping.title;
    };

    typeToArrowClass = type => {
        const mapping = typeMapping[type];

        if (!mapping)
            return '';

        return mapping.className;
    };

    render() {
        const {tx} = this.props;
        const arrowClassName = 'arrow ' + this.typeToArrowClass(tx.type);

        return (
            <tr>
                <td data-label="ID / Type">
                    <div className="line no-wrap"><TransactionRef txId={tx.id}/></div>
                    <div className="line"><label>{this.typeToLabel(tx.type)}</label></div>
                </td>
                <td data-label="Timestamp" className="timestamp">
                    <div className="line"><label>{tx.date}</label></div>
                    <div className="line"><label>{tx.time}</label></div>
                </td>
                <td data-label="Sender / Receiver">
                    <div className={arrowClassName}></div>
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
