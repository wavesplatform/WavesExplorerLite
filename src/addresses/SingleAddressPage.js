import React from 'react';

import {apiBuilder} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';

import TransactionList from './TransactionList';
import AssetList from './AssetList';
import GroupedAliasList from './GroupedAliasList';
import Tabs from './Tabs';
import Pane from './Pane';
import BalanceDetails from './BalanceDetails';

const transactions = [{
    id: 'CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS',
    type: 7,
    date: '00.00.0000',
    time: '00:00:00',
    sender: '3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he',
    recipient: '3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3',
    in: {
        amount: '182.56761789',
        currency: 'WAVES'
    },
    out: {
        amount: '0.09787450',
        currency: 'BTC'
    },
    price: {
        amount: '245.28404366',
        currency: 'WAVES'
    }
}, {
    id: 'CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS',
    type: 11,
    date: '00.00.0000',
    time: '00:00:00',
    recipient: '3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he',
    in: {
        amount: '100000.00000000',
        currency: 'profitbot'
    },
    spam: true
}];

const assets = [{
    id: '96MaKscZERV8bHaPvXcBRaEab881Hj2Kywja4uzgE100',
    name: 'MrBigMike',
    amount: '284,949.48281863'
}];

const aliases = [{
    letter: 'M',
    aliases: ['MrBigMike', 'Mfhdjs#&42_32f', 'Mike32341531']
}, {
    letter: 'N',
    aliases: ['NfhdLdf44852572547', 'Nnnnnnnn', 'N___fds#@3', 'nnnnbnn3', 'Nn321', 'n_341f', 'NinaAd', 'Noki-Poki']
}];

export default class SingleAddressPage extends React.Component {

    state = {
        balance: {},
        assets: [],
        selectedTabIndex: 0
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId ||
            this.props.match.params.address !== prevProps.match.params.address) {
            this.fetchData();
        }
    }

    fetchData() {
        const {networkId, address} = this.props.match.params;
        const api = apiBuilder(networkId);

        api.addresses.details(address).then(balanceResponse => {
            this.setState({balance: balanceResponse.data});
        });

        this.fetchTabData(this.state.selectedTabIndex);
    }

    fetchTabData(selectedIndex) {
        const {networkId, address} = this.props.match.params;
        const api = apiBuilder(networkId);

        switch (selectedIndex) {
            case 0:
            case 1:
                api.addresses.assetsBalance(address).then(balanceResponse => {
                    const assets = balanceResponse.data.balances.map(item => {
                        return {
                            id: item.assetId,
                            name: item.issueTransaction.name,
                            amount: item.balance
                        };
                    });

                    this.setState({assets});
                });

                break;
            case 2:
                api.addresses.aliases(address).then(aliasesResponse => {
                    //TODO: map response to state
                });

                break;
        }
    }

    handleTabActivate = (selectedIndex) => {
        this.fetchTabData(selectedIndex);
    };

    render() {
        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Address" subtitle={this.props.match.params.address} />
                <BalanceDetails balance={this.state.balance} />
                <Tabs onTabActivate={this.handleTabActivate} selectedIndex={this.state.selectedTabIndex}>
                    <Pane title="Last 100 transactions">
                        <TransactionList transactions={transactions} />
                    </Pane>
                    <Pane title="Aliases">
                        <GroupedAliasList aliases={aliases} />
                    </Pane>
                    <Pane title="Assets">
                        <AssetList assets={this.state.assets} />
                    </Pane>
                </Tabs>
            </React.Fragment>
        );
    }
}
