import React from 'react';

import GoBack from '../../Components/GoBack';
import Headline from '../../Components/Headline';
import Loader from '../../Components/Loader';
import Dictionary from '../../Components/Dictionary';
import TransactionRef from '../../Components/TransactionRef';
import EndpointRef from '../../Components/EndpointRef';
import ScriptInfo from '../../Components/ScriptInfo';
import ServiceFactory from '../../services/ServiceFactory';

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
                <div className="content card">
                    <GoBack />
                    <Headline title="Asset" subtitle={this.props.match.params.assetId} />
                    <Dictionary items={dictionaryItems} />
                </div>
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
        },
        ...this.buildScriptItem(details.scriptDetails),
        {
            label: 'Sponsored Fee',
            value: details.minSponsoredFee ? details.minSponsoredFee.toString() : 'N/A'
        }];
    }

    buildScriptItem(scriptDetails) {
        if (!scriptDetails)
            return [];

        return [{
            label: 'Script',
            value: <ScriptInfo script={scriptDetails.script} />
        }];
    }
}

export default SingleAssetPage;
