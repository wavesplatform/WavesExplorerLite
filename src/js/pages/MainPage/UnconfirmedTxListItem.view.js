import React from 'react';
import PropTypes from 'prop-types';

import EndpointRef from '../../components/EndpointRef';

export class UnconfirmedTxListItem extends React.PureComponent {
    static propTypes = {
        transaction: PropTypes.object.isRequired
    };

    render() {
        const tx = this.props.transaction;
        const amount = tx.amount || tx.totalAmount;

        return (
            <div className="grid panel-row">
                <div className="divider divider-utx grid-item-fixed"></div>
                <div>
                    <div className="line no-wrap">{tx.id}</div>
                    <div className="line">
                        {amount
                            ? <>
                                <label>Amount</label>{' ' + amount.toString()}
                                <div className="link-spacer"></div>
                            </>
                            : ''}

                        <label className="nowrap">Fee {tx.fee.toString()}</label>
                    </div>
                    <div className="line wide">
                        <EndpointRef endpoint={tx.sender} appearance="regular" title="Sender"/>
                        <div className="link-spacer"></div>
                        {tx.recipient && <EndpointRef endpoint={tx.recipient} appearance="regular" title="Recipient"/>}
                    </div>
                </div>
                <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                <div className="md-hide sm-show grid-item-fixed">
                    <div className="line"><label>{tx.timestamp.time}</label></div>
                    <div className="line"><label>{tx.timestamp.date}</label></div>
                    <div className="line wide"><label>Type {tx.type}</label></div>
                </div>
            </div>
        );
    }
}
