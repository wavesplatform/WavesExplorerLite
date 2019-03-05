import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../Components/Loader';
import GoBack from '../../Components/GoBack';
import Headline from '../../Components/Headline';
import Dictionary from '../../Components/Dictionary';
import transactionToDictionary from './TransactionToDictionaryTransformer';
import MassPaymentDetails from './MassPaymentDetails';

export default class SingleTransactionPage extends React.Component {
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
                <Loader fetchData={this.fetchData} errorTitle="Failed to load transaction">
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
