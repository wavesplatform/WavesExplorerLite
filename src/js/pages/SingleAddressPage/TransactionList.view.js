import React from 'react';
import PropTypes from 'prop-types';
import Enumerator from '../../components/Enumerator';

import {TransactionListItem} from './TransactionListItem.view';

export class TransactionListView extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        navigation: PropTypes.object.isRequired
    };

    render() {
        return (
            <>
                <table className="address-tr-list table-sm-transform">
                    <thead>
                        <tr>
                            <th>ID / Type</th>
                            <th className="timestamp">Timestamp</th>
                            <th>Sender / Receiver</th>
                            <th className="amount">Amount in / out</th>
                            <th className="price">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.transactions.map((tx, index) => {
                        return (<TransactionListItem key={index} tx={tx} />);
                    })}
                    </tbody>
                </table>
                <div className="pager">
                    <Enumerator {...this.props.navigation}/>
                </div>
            </>
        );
    }
}
