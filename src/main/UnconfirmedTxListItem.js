import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class UnconfirmedTxListItem extends React.PureComponent {
    static propTypes = {
        transaction: PropTypes.object.isRequired
    };

    render() {
        const tx = this.props.transaction;
        return (
            <div className="grid panel-row">
                <div className="divider divider-utx grid-item-fixed"></div>
                <div>
                    <div className="line no-wrap"><Link to={`${this.props.baseUrl}/tx/${tx.id}`}>{tx.id}</Link></div>
                    <div className="line">
                        <label>Amount</label> {tx.amount}
                        <label className="right">Fee {tx.fee}</label>
                    </div>
                    <div className="line wide">
                        <Link to={`${this.props.baseUrl}/address/${tx.sender}`} className="no-accent">Sender</Link>
                        <Link to={`${this.props.baseUrl}/address/${tx.recipient}`} className="no-accent">Recipient</Link>
                    </div>
                </div>
                <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                <div className="md-hide sm-show grid-item-fixed">
                    <div className="line"><label>{tx.time}</label></div>
                    <div className="line"><label>{tx.date}</label></div>
                    <div className="line wide"><label>Type {tx.type}</label></div>
                </div>
            </div>
        );
    }
}
