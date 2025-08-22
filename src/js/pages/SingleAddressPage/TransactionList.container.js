import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {TransactionListView} from './TransactionList.view';
import transactionMapper from './TransactionMapper';
import {withRouter} from "../../withRouter";

const TX_PAGE_SIZE = 100;

class TransactionListContainer extends React.Component {
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    state = {
        transactions: [],
        loading: false,
        hasMore: true,
        dApps: {}
    };

    fetchData = () => {
        const {address, networkId} = this.props.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        const currentUser = {
            address,
        };

        const transactionsPromise = addressService.loadTransactions(address, TX_PAGE_SIZE).then(transactions => {
            return transactionMapper(transactions, currentUser);
        }).then(transactions => {
            this._isMounted && this.setState({
                transactions,
                invertedAliases: currentUser.aliases,
                hasMore: transactions.length === TX_PAGE_SIZE
            });
        });

        if (networkId === 'mainnet' || networkId === undefined) {
            const dAppsPromise = addressService.loadDApps().then(dApps => this.setState({dApps}))
            return Promise.all([transactionsPromise, dAppsPromise])
        } else return transactionsPromise
    };


    loadMore = (after) => {
        const {address, networkId} = this.props.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadTransactions(address, TX_PAGE_SIZE, after).then(transactions => {
            const currentUser = {
                address,
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
                    dApps={this.state.dApps}
                />
            </Loader>
        );
    }
}

const RoutedTransactionListContainer = withRouter(TransactionListContainer);

export default RoutedTransactionListContainer;
