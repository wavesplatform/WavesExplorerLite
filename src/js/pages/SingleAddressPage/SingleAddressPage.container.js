import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import GoBack from '../../components/GoBack';
import Headline, {HeadlineSize} from '../../components/Headline';
import Loader from '../../components/Loader';

import {routeBuilder} from '../../shared/Routing';
import TransactionList from './TransactionList.container';
import AssetList from './AssetList.container';
import NonFungibleTokenList from './NonFungibleTokenList.container';
import GroupedAliasList from './GroupedAliasList.container';
import DataTab from './DataTab.container';
import ScriptTab from './ScriptTab.container';
import {RoutedTabsContainer} from './Tabs.container';
import {Tab} from './Tab.view';
import {BalanceDetails} from './BalanceDetails.view';
import {wavesAddress2eth} from "@waves/node-api-js";

const INITIAL_STATE = {
    balance: {}
};

export class SingleAddressPage extends React.Component {
    state = Object.assign({}, INITIAL_STATE);

    componentDidUpdate(prevProps) {
        const {networkId, address} = this.props.match.params;
        const {networkId: prevNetworkId, address: prevAddress} = prevProps.match.params;

        if (networkId !== prevNetworkId || address !== prevAddress) {
            this.setState(INITIAL_STATE);
            this.fetchData();
        }
    }

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadBalance(address)
            .then(balance => this.setState({balance}));
    };

    render() {
        const {networkId, address, tab} = this.props.match.params;
        const basePath = routeBuilder(networkId).addresses.one(address);

        const ethAddress = wavesAddress2eth(this.props.match.params.address)
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load address details">
                <div className="content card">
                    <GoBack/>
                    <div className="address-title">
                        <Headline title="Address" subtitle={this.props.match.params.address} size={HeadlineSize.Medium}/>
                        <Headline title="Ethereum Address" subtitle={ethAddress} size={HeadlineSize.Small}/>
                    </div>
                    <BalanceDetails balance={this.state.balance}/>
                    <RoutedTabsContainer defaultTab="tx" basePath={basePath} activeTab={tab}>
                        <Tab id="tx" title="Transactions" component={TransactionList}/>
                        <Tab id="aliases" title="Aliases" component={GroupedAliasList}/>
                        <Tab id="assets" title="Assets" component={AssetList}/>
                        <Tab id="nft" title="Non-fungible tokens" component={NonFungibleTokenList}/>
                        <Tab id="data" title="Data" component={DataTab}/>
                        <Tab id="script" title="Script" component={ScriptTab}/>
                    </RoutedTabsContainer>
                </div>
            </Loader>
        );
    }
}
