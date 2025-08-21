import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {ERROR_TYPES} from '../../components/Error';
import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Dictionary from '../../components/Dictionary';
import Tooltip from '../../components/Tooltip';
import transactionToDictionary from './TransactionToDictionaryTransformer';
import {MassPaymentDetails} from './MassPaymentDetails.view';
import {RoutedRawTransactionContainer} from './RawTransaction.container';
import {withRouter} from "../../withRouter";

const LOADER_ERROR_CAPTIONS = {
    [ERROR_TYPES.GENERIC]: 'Failed to load transaction',
    [ERROR_TYPES.NOT_FOUND]: 'Transaction not found in blockchain'
};

class SingleTransactionPage extends React.Component {
    state = {
        tx: {
            id: this.props.params.transactionId
        },
        dApps: {}
    };

    componentDidUpdate(prevProps) {
        const {transactionId, networkId} = this.props.params;
        const {transactionId: prevTransactionId, networkId: prevNetworkId} = prevProps.params;

        if (transactionId !== prevTransactionId || networkId !== prevNetworkId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {transactionId, networkId} = this.props.params;

        const transactionPromise = ServiceFactory
            .forNetwork(networkId)
            .transactionService()
            .loadTransaction(transactionId)
            .then(tx => this.setState({tx}));

        if (networkId === 'mainnet' || networkId === undefined) {
            const dAppsPromise = ServiceFactory
                .forNetwork(networkId)
                .addressService()
                .loadDApps()
                .then(dApps => this.setState({dApps}))
            return Promise.all([transactionPromise, dAppsPromise])
        } else return transactionPromise
    };

    render() {
        const transactionItems = transactionToDictionary(this.state.tx, this.props.params.networkId, this.state.dApps);
        if (!!transactionItems.default && transactionItems.default.length > 0) {
            transactionItems.default.push({
                label: 'JSON',
                value: <RoutedRawTransactionContainer/>
            });
        }

        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.fetchData} errorTitles={LOADER_ERROR_CAPTIONS} shouldRetry={true}>
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
 export const RoutedSingleTransactionPage = withRouter(SingleTransactionPage);
