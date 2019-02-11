import React from 'react';

import Loader from '../shared/Loader';
import Headline from '../shared/Headline';
import ServiceFactory from '../services/ServiceFactory';
import transactionMapper from '../addresses/TransactionMapper';
import TransactionList from './TransactionList';
import RequestForm from './RequestForm';

export default class FaucetPage extends React.Component {
    state = {
        tx: []
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {networkId} = this.props.match.params;
        const faucet = ServiceFactory
            .global()
            .configurationService()
            .get(networkId)
            .faucet;

        if (!faucet)
            return Promise.reject(new Error('Faucet is not configured for current network'));

        return ServiceFactory
            .forNetwork(networkId)
            .faucetService()
            .loadTransactions()
            .then(transactions => transactionMapper(transactions, faucet.address))
            .then(tx => this.setState({tx}));
    };

    requestMoney = (values) => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .faucetService()
            .requestMoney(values.address, values.captchaToken);
    };

    validateAddress = (address) => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .addressService()
            .validate(address);
    };

    render() {
        const {networkId} = this.props.match.params;
        const {faucet, displayName} = ServiceFactory.global().configurationService().get(networkId);
        if (!faucet)
            return null;

        return (
            <div className="content card card-multicolumn">
                <div className="content-side__left">
                    <div className="card faucet">
                        <div className="faucet-image"></div>
                        <RequestForm
                            networkName={displayName}
                            onSubmit={this.requestMoney}
                            captchaKey={faucet.captchaKey}
                            validateAddress={this.validateAddress}
                        />
                    </div>
                    <div className="basic500 faucet-description fs12">If you experience any problems with the faucet,
                        please contact <a href="mailto:support@wavesplatform.com">support@wavesplatform.com</a></div>
                </div>

                <div className="content-side__right">
                    <Loader fetchData={this.fetchData} errorTitle="Failed to load faucet transactions">
                        <div className="card">
                            <Headline title={`Faucet Transactions (${this.state.tx.length})`} copyVisible={false}/>
                            <TransactionList transactions={this.state.tx} />
                        </div>
                    </Loader>
                </div>
            </div>
        );
    }
}
