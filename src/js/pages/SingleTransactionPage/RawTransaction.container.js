import React from 'react';
import {withRouter} from 'react-router';
import ServiceFactory from '../../services/ServiceFactory';
import RawJsonViewer from "./RawJsonViewer";

class RawTransactionContainer extends React.Component {
    state = {json: undefined};

    fetchData = () => {
        if (this.state.json)
            return Promise.resolve(this.state.json);

        const {transactionId, networkId} = this.props.match.params;
        return ServiceFactory
            .forNetwork(networkId)
            .transactionService()
            .loadRawTransaction(transactionId)
            .then(tx => this.setState({json: tx}));
    };

    render() {
        return <RawJsonViewer json={this.state.json} fetchData={this.fetchData}/>
    }
}

export const RoutedRawTransactionContainer = withRouter(RawTransactionContainer);
