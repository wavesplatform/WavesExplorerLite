import React from 'react';
import PropTypes from 'prop-types';

import {TransactionListView} from './TransactionList.view';

export class TransactionListContainer extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        pageSize: PropTypes.number.isRequired,
        loadMore: PropTypes.func.isRequired
    };

    state = {
        transactions: this.props.transactions,
        loading: false,
        hasMore: this.props.transactions.length === this.props.pageSize
    };

    componentDidUpdate(prevProps) {
        if (prevProps.transactions.length !== this.props.transactions.length) {
            this.setState({
                transactions: this.props.transactions,
                hasMore: this.props.transactions.length === this.props.pageSize
            });
        }
    }

    handleMore = () => {
        if (this.state.transactions.length < 1)
            return;

        if (this.state.loading)
            return;

        this.setState({loading: true});
        const next = this.state.transactions[this.state.transactions.length - 1].id;

        this.props.loadMore(next).then(transactions => {
            this.setState(prevState => ({
                transactions: prevState.transactions.concat(transactions),
                loading: false,
                hasMore: transactions.length === this.props.pageSize
            }))
        });
    };

    render() {
        return (
            <TransactionListView
                transactions={this.state.transactions}
                hasMore={this.state.hasMore}
                loadMore={this.handleMore}
            />
        );
    }
}
