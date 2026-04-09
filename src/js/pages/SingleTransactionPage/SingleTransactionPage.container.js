import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {ERROR_TYPES} from '../../components/Error';
import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Dictionary from '../../components/Dictionary';
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
        finalizedHeight: 1,
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
        const finalityService = ServiceFactory.forNetwork(networkId).finalityService();

        const transactionPromise = ServiceFactory
            .forNetwork(networkId)
            .transactionService()
            .loadTransaction(transactionId);

        const finalizedHeightPromise = finalityService
            .loadHeaderInfo()
            .then(info => (Number.isFinite(info.lastFinalizedHeight) ? info.lastFinalizedHeight : 1))
            .catch(() => 1);

        const composedTxPromise = Promise.all([transactionPromise, finalizedHeightPromise]).then(([tx, finalizedHeight]) => {
            const txWithFinality = {
                ...tx,
                isFinalizedBlock: Number.isFinite(tx.height) ? finalizedHeight >= tx.height : false
            };
            this.setState({tx: txWithFinality, finalizedHeight});
        });

        if (networkId === 'mainnet' || networkId === undefined) {
            const dAppsPromise = ServiceFactory
                .forNetwork(networkId)
                .addressService()
                .loadDApps()
                .then(dApps => this.setState({dApps}))
            return Promise.all([composedTxPromise, dAppsPromise])
        } else return composedTxPromise
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
