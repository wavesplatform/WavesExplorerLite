import React from 'react';

import GoBack from '../shared/GoBack';
import Headline from '../shared/Headline';
import Loader from '../shared/Loader';
import Dictionary from '../shared/Dictionary';
import TransactionRef from '../shared/TransactionRef';
import EndpointRef from '../shared/EndpointRef';
import ServiceFactory from '../services/ServiceFactory';

class SingleAssetPage extends React.Component {
    state = {
        loading: true,
        details: {}
    };

    componentDidUpdate(prevProps) {
        const {networkId, assetId} = this.props.match.params;
        const {networkId: prevNetworkId, assetId: prevAssetId} = prevProps.match.params;

        if (networkId !== prevNetworkId || assetId !== prevAssetId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        this.setState({loading: true});

        const {networkId, assetId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .assetService()
            .loadDetails(assetId)
            .then(details => this.setState({
                loading: false,
                details
            }));
    };

    render() {
        const dictionaryItems = this.stateToDictionaryItems();
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load asset details">
                <React.Fragment>
                    <GoBack />
                    <Headline title="Asset" subtitle={this.props.match.params.assetId} />
                    <Dictionary items={dictionaryItems} />
                </React.Fragment>
            </Loader>
        );
    }

    stateToDictionaryItems() {
        if (this.state.loading)
            return [];

        const {details} = this.state;
        return [{
            label: 'Transaction Id',
            value: <TransactionRef txId={details.id} />
        }, {
            label: 'Issue Height',
            value: details.issued.height
        }, {
            label: 'Issued at',
            value: details.issued.timestamp.toLongString()
        }, {
            label: 'Issuer',
            value: <EndpointRef endpoint={details.issuer} />
        }, {
            label: 'Asset Name',
            value: details.name,
        }, {
            label: 'Description',
            value: <span>{details.description}</span>
        }, {
            label: 'Decimals',
            value: details.decimals
        }, {
            label: 'Reissuable',
            value: (!!details.reissuable).toString()
        }, {
            label: 'Quantity',
            value: details.quantity.toString()
        }, {
            label: 'Scripted',
            value: (!!details.scripted).toString()
        }, {
            label: 'Sponsored Fee',
            value: details.minSponsoredFee ? details.minSponsoredFee.toString() : 'N/A'
        }];
    }
}

export default SingleAssetPage;
