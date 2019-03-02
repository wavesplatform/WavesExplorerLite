import React from 'react';

import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Loader from '../shared/Loader';
import ServiceFactory from '../services/ServiceFactory';

import TransactionList from './TransactionList';
import AssetList from './AssetList';
import GroupedAliasList from './GroupedAliasList';
import DataInfo from '../shared/DataInfo';
import ScriptInfo from '../shared/ScriptInfo';
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
            .then(_ => this.fetchTabData(this.state.selectedTabIndex));
    };

    fetchTabData = (selectedIndex) => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

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

            case 3:
                return addressService.loadData(address).then(data => this.setState({data}));

            case 4:
                return addressService.loadScript(address).then(script => this.setState({script}));
        }

        return Promise.resolve();
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
                            <TransactionList transactions={this.state.transactions} />
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
