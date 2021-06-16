import React from 'react';

import GoBack from '../../components/GoBack';
import Headline from '../../components/Headline';
import Loader from '../../components/Loader';
import Dictionary from '../../components/Dictionary';
import TransactionRef from '../../components/TransactionRef';
import EndpointRef from '../../components/EndpointRef';
import ScriptInfo from '../../components/ScriptInfo';
import Timestamp from '../../components/Timestamp';
import ServiceFactory from '../../services/ServiceFactory';
import {RoutedBlockRef} from "../../components/BlockRef/BlockRef.view";

export class SingleAssetPage extends React.Component {
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
        return {
            default: [{
                label: 'Origin Tx Id',
                value: <TransactionRef txId={details.originTransactionId}/>
            }, {
                label: 'Issue Height',
                value: <RoutedBlockRef height={details.issued.height} />
            }, {
                label: 'Issued at',
                value: <Timestamp value={details.issued.timestamp}/>
            }, {
                label: 'Issuer',
                value: <EndpointRef endpoint={details.issuer}/>
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
                }]
        };
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
