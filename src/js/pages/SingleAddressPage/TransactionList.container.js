import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {TransactionListView} from './TransactionList.view';

export class TransactionListContainer extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        pageSize: PropTypes.number.isRequired,
        loadMore: PropTypes.func.isRequired,
        cardElement: PropTypes.instanceOf(Element)
    };

    state = {
        transactions: this.props.transactions,
        loading: false,
        x: this.props.pageSize,
        y: this.props.transactions.length,
        hasMore: this.props.transactions.length === this.props.pageSize
    };

    componentDidUpdate(prevProps) {
        if (prevProps.transactions.length !== this.props.transactions.length) {
            console.log('updating state');
            this.setState({
                transactions: this.props.transactions,
                hasMore: this.props.transactions.length === this.props.pageSize
            });
        }
    }

    handleMore = () => {
        console.log('Loading more!');

        if (this.state.transactions.length < 1)
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
        console.log('state', this.state);
        console.log('props', this.props);

        return (
            <TransactionListView
                transactions={this.state.transactions}
                hasMore={this.state.hasMore}
                loadMore={this.handleMore}
                pageSize={this.props.pageSize}
                cardElement={this.props.cardElement}
            />
        );
    }
}
