import React from 'react';

import Loader from '../shared/Loader';
import Headline from '../shared/Headline';
import ServiceFactory from '../services/ServiceFactory';
import transactionMapper from '../addresses/TransactionMapper';
import TransactionList from './TransactionList';
import Recaptcha from 'react-google-recaptcha';

export default class FaucetPage extends React.Component {
    state = {
        tx: [],
        captchaToken: null
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

    handleCaptchaChanged = (value) => {
        console.log('Captcha', value);
    };

    render() {
        const {networkId} = this.props.match.params;
        const {faucet} = ServiceFactory.global().configurationService().get(networkId);
        if (!faucet)
            return null;

        return (
            <div className="content card card-multicolumn">
                <div className="content-side__left">
                    <div className="card faucet">
                        <div className="faucet-image"></div>
                        <form action="">
                            <label className="basic700 margin4">Testnet address</label>
                            <label className="basic500 margin6 fs12">Fill out your Testnet address to receive 10 WAVES</label>

                            <div className="margin24 fs14">
                                <input type="text" placeholder="Address" className="basic500"/>
                                <div className="input-error">Address required</div> {/* TODO @Ishchenko - add validation */}
                                <div className="input-error">Invalid address</div>
                            </div>

                            <label className="basic700 margin6">Confirm you're a human</label>
                            <div className="captcha margin24"> {/* TODO @uIsk - remove .captcha class */}
                                <Recaptcha
                                    style={{ display: "inline-block" }}
                                    sitekey={faucet.captchaKey}
                                    onChange={this.handleCaptchaChanged} />
                                <div className="input-error">Captcha is expired</div>
                            </div>

                            <button className="submit big long get-waves-btn disabled"> {/* @Ishchenko - addClass .disabled if empty onput field */}
                                <span>Request 10 WAVES</span>
                            </button>
                        </form>
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
