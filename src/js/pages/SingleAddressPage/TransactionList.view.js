import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import {TransactionListItem} from './TransactionListItem.view';

export class TransactionListView extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        pageSize: PropTypes.number.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadMore: PropTypes.func.isRequired,
        cardElement: PropTypes.instanceOf(Element)
    };

    render() {
        return (
            <InfiniteScroll
                dataLength={this.props.pageSize}
                next={this.props.loadMore}
                hasMore={this.props.hasMore}
                endMessage="No more transactions">
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
                        return (<TransactionListItem key={tx.id} tx={tx} />);
                    })}
                    </tbody>
                </table>
            </InfiniteScroll>
        );
    }
}
