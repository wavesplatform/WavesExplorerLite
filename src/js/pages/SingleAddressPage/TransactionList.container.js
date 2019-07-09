import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {TransactionListView} from './TransactionList.view';

const INITIAL_NAV_STATE = {
    history: [],
    after: null,
    loading: false
};

class TransactionListContainer extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        pageSize: PropTypes.number.isRequired,
        loadAfter: PropTypes.func.isRequired
    };

    state = INITIAL_NAV_STATE;

    componentDidUpdate(prevProps) {
        const {networkId, address} = this.props.match.params;
        const {networkId: prevNetworkId, address: prevAddress} = prevProps.match.params;

        if (networkId !== prevNetworkId || address !== prevAddress) {
            this.setState(INITIAL_NAV_STATE);
        }
    }

    handleNext = () => {
        if (this.props.transactions.length < 1)
            return;

        this.setState({loading: true});
        const nextAfter = this.props.transactions[this.props.transactions.length - 1].id;

        this.props.loadAfter(nextAfter).then(() => {
            this.setState((prevState) => {
                const history = prevState.history.slice();
                history.push(prevState.after);

                return {
                    history,
                    loading: false,
                    after: nextAfter
                };
            });
        });
    };

    handlePrev = () => {
        if (this.state.history.length < 1)
            return;

        this.setState({loading: true});
        const prevAfter = this.state.history[this.state.history.length - 1];

        this.props.loadAfter(prevAfter).then(() => {
            this.setState((prevState) => ({
                history: prevState.history.slice(0, -1),
                loading: false,
                after: prevAfter
            }));
        });
    };

    render() {
        const x = this.state.history.length * this.props.pageSize;
        const from = x + 1;
        const to = this.props.transactions.length + x;

        const nav = {
            label: `${from}-${to}`,
            hasPrev: this.state.history.length > 0,
            hasNext: this.props.transactions.length === this.props.pageSize,
            disabled: this.state.loading,
            onNext: this.handleNext,
            onPrev: this.handlePrev
        };

        return (
            <TransactionListView transactions={this.props.transactions} navigation={nav} />
        );
    }
}

export const RoutedTransactionListContainer = withRouter(TransactionListContainer);
