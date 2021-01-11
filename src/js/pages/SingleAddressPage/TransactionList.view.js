import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {Loading} from '../../components/Loader/Loading.view';

import {TransactionListItem} from './TransactionListItem.view';

export class TransactionListView extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadMore: PropTypes.func.isRequired
    };

    render() {
        return (
            <InfiniteScroll
                initialLoad={false}
                loadMore={this.props.loadMore}
                hasMore={this.props.hasMore}
                loader={<Loading key="tx-loader"/>}>
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
                    {this.props.transactions.map(tx => {
                        return (<TransactionListItem key={tx.id} tx={tx} />);
                    })}
                    </tbody>
                </table>
            </InfiniteScroll>
        );
    }
}
