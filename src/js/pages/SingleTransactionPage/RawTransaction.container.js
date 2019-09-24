import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import {RawTransactionView} from './RawTransaction.view';

class RawTransactionContainer extends React.Component {
    state = {
        open: false,
        json: undefined
    };

    clickHandler = () => {
        this.setState(prevState => ({open: !prevState.open}));
    };

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
        return <RawTransactionView
            open={this.state.open}
            clickHandler={this.clickHandler}
            json={this.state.json}
            fetchData={this.fetchData}
        />;
    }
}

export const RoutedRawTransactionContainer = withRouter(RawTransactionContainer);
