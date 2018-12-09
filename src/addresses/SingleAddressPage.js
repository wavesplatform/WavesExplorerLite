import React from 'react';
import groupBy from 'lodash/groupBy';

import {api} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
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

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.address !== prevProps.match.params.address) {
            this.fetchData();
        }
    }

    fetchData() {
        const {address} = this.props.match.params;

        api.addresses.details(address).then(balanceResponse => {
            const data = balanceResponse.data;
            const balance = {
                regular: Money.fromCoins(data.regular, Currency.WAVES).toString(),
                generating: Money.fromCoins(data.generating, Currency.WAVES).toString(),
                available: Money.fromCoins(data.available, Currency.WAVES).toString(),
                effective: Money.fromCoins(data.effective, Currency.WAVES).toString()
            };

            this.setState({balance});
        });

        this.fetchTabData(this.state.selectedTabIndex);
    }

    fetchTabData(selectedIndex) {
        const {address} = this.props.match.params;

        switch (selectedIndex) {
            case 0:
                api.transactions.address(address).then(transactionsResponse => {
                    const transformerService = ServiceFactory.transactionTransformerService();

                    return transformerService.transform(transactionsResponse.data[0]);
                })
                .then(transactions => {
                    return transactionMapper(transactions, address);
                })
                .then(transactions => {
                    this.setState({transactions});
                });

                break;
            case 1:
                api.addresses.aliases(address).then(aliasesResponse => {
                    const lines = aliasesResponse.data.map(item => Alias.fromString(item).alias);
                    const grouped = groupBy(lines, item => item.toUpperCase().charAt(0));
                    const aliases = Object.keys(grouped).sort().map(letter => ({
                        letter,
                        aliases: grouped[letter].sort()
                    }));

                    this.setState({aliases});
                });

                break;
            case 2:
                api.addresses.assetsBalance(address).then(balanceResponse => {
                    const assets = balanceResponse.data.balances.map(item => {
                        const currency = Currency.fromIssueTransaction(item.issueTransaction);
                        const currencyService = ServiceFactory.currencyService();
                        currencyService.put(currency);

                        const amount = Money.fromCoins(item.balance, currency);

                        return {
                            id: item.assetId,
                            name: currency.toString(),
                            amount: amount.formatAmount()
                        };
                    });

                    this.setState({assets});
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
        );
    }
}
