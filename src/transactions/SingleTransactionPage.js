import React from 'react';

import {apiBuilder} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Dictionary from '../shared/Dictionary';
import MoneyServiceFactory from '../services/MoneyServiceFactory';
import TransactionTransformerService from '../services/TransactionTransformerService';

import transactionToDictionary from './TransactionToDictionaryTransformer';
import MassPaymentDetails from "./MassPaymentDetails";

export default class SingleTransactionPage extends React.Component {
    state = {
        tx: {
            id: this.props.match.params.transactionId
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData() {
        const {networkId, transactionId} = this.props.match.params;
        const api = apiBuilder(networkId);

        api.transactions.info(transactionId).then(infoResponse => {
            const currencyService = MoneyServiceFactory.currencyService(networkId);
            const transformer = new TransactionTransformerService(currencyService);

            return transformer.transform(infoResponse.data);
        }).then(tx => this.setState({tx}));
    }

    render() {
        const transactionItems = transactionToDictionary(this.state.tx);

        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Transaction" subtitle={this.state.tx.id} />
                <Dictionary items={transactionItems}/>
                <MassPaymentDetails tx={this.state.tx} />
            </React.Fragment>
        );
    }
}
