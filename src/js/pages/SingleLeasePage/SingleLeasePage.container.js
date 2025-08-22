import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {ERROR_TYPES} from '../../components/Error';
import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Dictionary from '../../components/Dictionary';
import Tooltip from '../../components/Tooltip';
import TransactionRef from '../../components/TransactionRef';
import EndpointRef from '../../components/EndpointRef';
import MoneyInfo from '../../components/MoneyInfo';

// import transactionToDictionary from './TransactionToDictionaryTransformer';

const LOADER_ERROR_CAPTIONS = {
    [ERROR_TYPES.GENERIC]: 'Failed to load lease',
    [ERROR_TYPES.NOT_FOUND]: 'Lease not found in blockchain'
};

const lease_mock = {
    id: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    originTransactionId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    height: 1610000,
    status: 'active', // canceled
    cancelHeight: 1610000,
    cancelTransactionId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    sender: "3P274YB5qseSE9DTTL3bpSjosZrYBPDpJ8k",
    recipient: "3P274YB5qseSE9DTTL3bpSjosZrYBPDpJ8k",
    amount: 1000
};

export class SingleLeasePage extends React.Component {
    state = {
        lease: {
            id: this.props.params.leaseId
        }
    };

    componentDidUpdate(prevProps) {
        const {transactionId, networkId} = this.props.params;
        const {transactionId: prevLeaseId, networkId: prevNetworkId} = prevProps.params;

        if (transactionId !== prevLeaseId || networkId !== prevNetworkId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {leaseId, networkId} = this.props.params;

        return ServiceFactory
            .forNetwork(networkId)
            .leaseService()
            .loadLease(leaseId)
            .then(lease => this.setState({lease}));
    };

    render() {
        const state = this.state;
        const items = this.getItems();

        return (
            <div className="loaderWrapper">
              <Loader fetchData={this.fetchData} errorTitles={LOADER_ERROR_CAPTIONS} shouldRetry={true}>
                    <div className="content card">
                        <GoBack />
                        <Headline title="Lease" subtitle={state.lease.id} />
                        <Dictionary items={items}/>
                    </div>
                </Loader>
            </div>
        );
    }

    getItems() {
        const lease = this.state.lease;

        if (!lease.status) {
            return { default: [] };
        }

        const items = {
            default: [
                { label: 'Lease tx id', value: <TransactionRef txId={lease.originTransactionId}/> },
                { label: 'Lease Height', value: lease.height},
                { label: 'Status', value: lease.status},
            ]
        };

        if (lease.status === 'canceled' ) {
            items.default = [
                ...items.default,
                { label: 'Lease Cancel tx id', value: <TransactionRef txId={lease.cancelTransactionId}/>  },
                { label: 'Lease Cancel Height', value: lease.cancelHeight }
            ];
        }

        items.default = [
            ...items.default,
            { label: 'Sender', value: <EndpointRef endpoint={lease.sender}/> },
            { label: 'Recipient', value: <EndpointRef endpoint={lease.recipient}/> },
            { label: 'Amount', value: <MoneyInfo value={lease.amount} /> }, // todo
        ];

        return items;
    }
}
