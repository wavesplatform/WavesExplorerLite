import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {TransactionListView} from './TransactionList.view';
import transactionMapper from './TransactionMapper';

const TX_PAGE_SIZE = 100;

class TransactionListContainer extends React.Component {
    state = {
        transactions: [],
        invertedAliases: [],
        loading: false,
        hasMore: true
    };

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadRawAliases(address).then(rawAliases => {
            const currentUser = {
                address,
                aliases: {}
            };

            return addressService.loadTransactions(address, TX_PAGE_SIZE).then(transactions => {
                rawAliases.forEach(item => {
                    currentUser.aliases[item] = true;
                });

                return transactionMapper(transactions, currentUser);
            })
            .then(transactions => {
                this.setState({
                    transactions,
                    invertedAliases: currentUser.aliases,
                    hasMore: transactions.length === TX_PAGE_SIZE
                });
            });
        });
    };

    loadMore = (after) => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadTransactions(address, TX_PAGE_SIZE, after).then(transactions => {
            const currentUser = {
                address,
                aliases: this.state.invertedAliases
            };

            return transactionMapper(transactions, currentUser);
        });
    };

    handleMore = () => {
        if (this.state.transactions.length < 1)
            return;

        if (this.state.loading)
            return;

        this.setState({loading: true});
        const next = this.state.transactions[this.state.transactions.length - 1].id;

        this.loadMore(next).then(transactions => {
            this.setState(prevState => ({
                transactions: prevState.transactions.concat(transactions),
                loading: false,
                hasMore: transactions.length === TX_PAGE_SIZE
            }))
        });
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load transactions for address">
                <TransactionListView
                    transactions={this.state.transactions}
                    hasMore={this.state.hasMore}
                    loadMore={this.handleMore}
                />
            </Loader>
        );
    }
}

const RoutedTransactionListContainer = withRouter(TransactionListContainer);

export default RoutedTransactionListContainer;
