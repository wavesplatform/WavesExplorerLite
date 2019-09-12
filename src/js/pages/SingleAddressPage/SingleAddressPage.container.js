import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Loader from '../../components/Loader';

import {routeBuilder, routeParamsBuilder} from '../../shared/Routing';
import TransactionList from './TransactionList.container';
import AssetList from './AssetList.container';
import NonFungibleTokenList from './NonFungibleTokenList.container';
import GroupedAliasList from './GroupedAliasList.container';
import DataTab from './DataTab.container';
import ScriptTab from './ScriptTab.container';
import {RoutedTabs} from './Tabs.container';
import {Pane} from './Pane.view';
import {BalanceDetails} from './BalanceDetails.view';
import transactionMapper from './TransactionMapper';

const TX_PAGE_SIZE = 100;

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

        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load address details">
                <div className="content card">
                    <GoBack />
                    <Headline title="Address" subtitle={this.props.match.params.address} />
                    <BalanceDetails balance={this.state.balance} />
                    <RoutedTabs defaultTab="lasttx" basePath={basePath} activeTab={tab}>
                        <Pane id="lasttx" title="Transactions" component={TransactionList} />
                        <Pane id="aliases" title="Aliases" component={GroupedAliasList} />
                        <Pane id="assets" title="Assets" component={AssetList} />
                        <Pane id="nft" title="Non-fungible tokens" component={NonFungibleTokenList} />
                        <Pane id="data" title="Data" component={DataTab} />
                        <Pane id="script" title="Script" component={ScriptTab} />
                    </RoutedTabs>
                </div>
            </Loader>
        );
    }
}
