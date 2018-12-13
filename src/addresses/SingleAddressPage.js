import React from 'react';
import groupBy from 'lodash/groupBy';

import {api} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import Error from '../shared/Error';
import Headline from '../shared/Headline';
import Loader from '../shared/Loader';
import Alias from '../shared/Alias';
import Currency from '../shared/Currency';
import Money from '../shared/Money';
import ServiceFactory from '../services/ServiceFactory';

import TransactionList from './TransactionList';
import AssetList from './AssetList';
import GroupedAliasList from './GroupedAliasList';
import Tabs from './Tabs';
import Pane from './Pane';
import BalanceDetails from './BalanceDetails';
import transactionMapper from './TransactionMapper';

export default class SingleAddressPage extends React.Component {

    state = {
        balance: {},
        assets: [],
        aliases: [],
        transactions: [],
        selectedTabIndex: 0
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.address !== prevProps.match.params.address) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {address} = this.props.match.params;
        const addressService = ServiceFactory.addressService();

        return addressService.loadBalance(address)
            .then(balance => this.setState({balance}))
            .then(_ => this.fetchTabData(this.state.selectedTabIndex));
    };

    fetchTabData = (selectedIndex) => {
        const {address} = this.props.match.params;
        const addressService = ServiceFactory.addressService();

        switch (selectedIndex) {
            case 0:
                return addressService.loadTransactions(address).then(transactions => {
                    return transactionMapper(transactions, address);
                })
                .then(transactions => {
                    this.setState({transactions});
                });

            case 1:
                return addressService.loadAliases(address).then(aliases => this.setState({aliases}));

            case 2:
                return addressService.loadAssets(address).then(assets => this.setState({assets}));
        }

        return Promise.resolve();
    };

    handleTabActivate = (selectedIndex) => {
        this.fetchTabData(selectedIndex);
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load address details">
                <React.Fragment>
                    <GoBack />
                    <Headline title="Address" subtitle={this.props.match.params.address} />
                    <BalanceDetails balance={this.state.balance} />
                    <Tabs onTabActivate={this.handleTabActivate} selectedIndex={this.state.selectedTabIndex}>
                        <Pane title="Last 100 transactions">
                            <TransactionList transactions={this.state.transactions} />
                        </Pane>
                        <Pane title="Aliases">
                            <GroupedAliasList aliases={this.state.aliases} />
                        </Pane>
                        <Pane title="Assets">
                            <AssetList assets={this.state.assets} />
                        </Pane>
                    </Tabs>
                </React.Fragment>
            </Loader>
        );
    }
}
