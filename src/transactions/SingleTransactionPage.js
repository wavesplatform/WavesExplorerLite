import React from 'react';

import {api} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Dictionary from '../shared/Dictionary';
import Error from '../shared/Error';
import ServiceFactory from '../services/ServiceFactory';

import transactionToDictionary from './TransactionToDictionaryTransformer';
import MassPaymentDetails from "./MassPaymentDetails";

export default class SingleTransactionPage extends React.Component {
    state = {
        tx: {
            id: this.props.match.params.transactionId
        },
        hasError: false
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {transactionId} = this.props.match.params;
        api.transactions.info(transactionId).then(infoResponse => {
            const transformer = ServiceFactory.transactionTransformerService();

            return transformer.transform(infoResponse.data);
        }).then(tx => this.setState({tx})).catch(error => {
            console.error(error);

            this.setState({hasError: true});
        });
    }

    render() {
        if (this.state.hasError) {
            return <Error title="Failed to load transaction" />;
        }

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
