import React from 'react';

import Loader from '../shared/Loader';
import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Dictionary from '../shared/Dictionary';
import ServiceFactory from '../services/ServiceFactory';

import transactionToDictionary from './TransactionToDictionaryTransformer';
import MassPaymentDetails from "./MassPaymentDetails";

export default class SingleTransactionPage extends React.Component {
    state = {
        tx: {
            id: this.props.match.params.transactionId
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.transactionId !== prevProps.match.params.transactionId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {transactionId} = this.props.match.params;
        return ServiceFactory.transactionService().loadTransaction(transactionId)
            .then(tx => this.setState({tx}));
    };

    render() {
        const transactionItems = transactionToDictionary(this.state.tx);

        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load transaction">
                <React.Fragment>
                    <GoBack />
                    <Headline title="Transaction" subtitle={this.state.tx.id} />
                    <Dictionary items={transactionItems}/>
                    <MassPaymentDetails tx={this.state.tx} />
                </React.Fragment>
            </Loader>
        );
    }
}
