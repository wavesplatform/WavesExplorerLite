import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {ERROR_TYPES} from '../../components/Error';
import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Dictionary from '../../components/Dictionary';
import transactionToDictionary from './TransactionToDictionaryTransformer';
import {MassPaymentDetails} from './MassPaymentDetails.view';

const LOADER_ERROR_CAPTIONS = {
    [ERROR_TYPES.GENERIC]: 'Failed to load transaction',
    [ERROR_TYPES.NOT_FOUND]: 'Transaction not found in blockchain'
};

export class SingleTransactionPage extends React.Component {
    state = {
        tx: {
            id: this.props.match.params.transactionId
        }
    };

    componentDidUpdate(prevProps) {
        const {transactionId, networkId} = this.props.match.params;
        const {transactionId: prevTransactionId, networkId: prevNetworkId} = prevProps.match.params;

        if (transactionId !== prevTransactionId || networkId !== prevNetworkId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {transactionId, networkId} = this.props.match.params;
        return ServiceFactory
            .forNetwork(networkId)
            .transactionService()
            .loadTransaction(transactionId)
            .then(tx => this.setState({tx}));
    };

    render() {
        const transactionItems = transactionToDictionary(this.state.tx);

        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.fetchData} errorTitles={LOADER_ERROR_CAPTIONS}>
                    <div className="content card">
                        <GoBack />
                        <Headline title="Transaction" subtitle={this.state.tx.id} />
                        <Dictionary items={transactionItems}/>
                        <MassPaymentDetails tx={this.state.tx} />
                    </div>
                </Loader>
            </div>
        );
    }
}
