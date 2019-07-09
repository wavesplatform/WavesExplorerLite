import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Loader from '../../components/Loader';
import DataInfo from '../../components/DataInfo';
import ScriptInfo from '../../components/ScriptInfo';

import {RoutedTransactionListContainer} from './TransactionList.container';
import {AssetList} from './AssetList.view';
import {GroupedAliasList} from './GroupedAliasList.view';
import {Tabs} from './Tabs.container';
import {Pane} from './Pane.view';
import {BalanceDetails} from './BalanceDetails.view';
import transactionMapper from './TransactionMapper';

const TX_PAGE_SIZE = 100;

export class SingleAddressPage extends React.Component {
    state = {
        balance: {},
        assets: [],
        aliases: [],
        transactions: {
            list: [],
            invertedAliases: undefined
        },
        data: [],
        script: {},
        selectedTabIndex: 0
    };

    componentDidUpdate(prevProps) {
        const {networkId, address} = this.props.match.params;
        const {networkId: prevNetworkId, address: prevAddress} = prevProps.match.params;

        if (networkId !== prevNetworkId || address !== prevAddress) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadBalance(address)
            .then(balance => this.setState({balance}))
            .then(_ => this.fetchTabData(this.state.selectedTabIndex, true));
    };

    fetchTabData = (selectedIndex, forceUpdate) => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        switch (selectedIndex) {
            case 0:
                return this._loadTransactions(addressService, address, forceUpdate);

            case 1:
                return this._loadAliases(addressService, address, forceUpdate);

            case 2:
                return this._loadAssets(addressService, address, forceUpdate);

            case 3:
                return this._loadData(addressService, address, forceUpdate);

            case 4:
                return this._loadScript(addressService, address);
        }

        return Promise.resolve();
    };

    _loadTransactions = (addressService, address, forceUpdate) => {
        if (!forceUpdate && this.state.transactions.list.length > 0)
            return Promise.resolve();

        return addressService.loadRawAliases(address).then(rawAliases => {
            const aliases = addressService.transformAndGroupAliases(rawAliases);
            this.setState({aliases});

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
                        transactions: {
                            list: transactions,
                            invertedAliases: currentUser.aliases
                        }
                    });
                });
        });
    };

    _loadMoreTransactions = (after) => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadTransactions(address, TX_PAGE_SIZE, after).then(transactions => {
            const currentUser = {
                address,
                aliases: this.state.transactions.invertedAliases
            };

            return transactionMapper(transactions, currentUser);
        }).then(transactions => {
            this.setState((prevState) => ({
                transactions: {
                    ...prevState.transactions,
                    list: transactions
                }
            }));
        });
    };

    _loadAliases = (addressService, address, forceUpdate) => {
        if (!forceUpdate && this.state.aliases.length > 0)
            return Promise.resolve();

        return addressService.loadAliases(address).then(aliases => this.setState({aliases}));
    };

    _loadAssets = (addressService, address, forceUpdate) => {
        if (!forceUpdate && this.state.assets.length > 0)
            return Promise.resolve();

        return addressService.loadAssets(address).then(assets => this.setState({assets}));
    };

    _loadData = (addressService, address, forceUpdate) => {
        if (!forceUpdate && this.state.data.length > 0)
            return Promise.resolve();

        return addressService.loadData(address).then(data => this.setState({data}));
    };

    _loadScript = (addressService, address) => {
        return addressService.loadScript(address).then(script => this.setState({script}));
    };

    handleTabActivate = (selectedIndex) => {
        this.fetchTabData(selectedIndex);
        this.setState({selectedTabIndex: selectedIndex});
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load address details">
                <div className="content card">
                    <GoBack />
                    <Headline title="Address" subtitle={this.props.match.params.address} />
                    <BalanceDetails balance={this.state.balance} />
                    <Tabs onTabActivate={this.handleTabActivate} selectedIndex={this.state.selectedTabIndex}>
                        <Pane title="Last 100 transactions">
                            <RoutedTransactionListContainer
                                transactions={this.state.transactions.list}
                                pageSize={TX_PAGE_SIZE}
                                loadAfter={this._loadMoreTransactions}
                            />
                        </Pane>
                        <Pane title="Aliases">
                            <GroupedAliasList aliases={this.state.aliases} />
                        </Pane>
                        <Pane title="Assets">
                            <AssetList assets={this.state.assets} />
                        </Pane>
                        <Pane title="Data">
                            <DataInfo data={this.state.data} />
                        </Pane>
                        <Pane title="Script">
                            <ScriptInfo script={this.state.script.script} />
                        </Pane>
                    </Tabs>
                </div>
            </Loader>
        );
    }
}
