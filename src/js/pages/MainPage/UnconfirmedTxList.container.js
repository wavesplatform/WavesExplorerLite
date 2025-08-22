import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {UnconfirmedTxList} from './UnconfirmedTxList.view';
import {withRouter} from "../../withRouter";

class UnconfirmedTxListContainer extends React.Component {
    state = {
        transactions: [],
        size: 0
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.params;
        return ServiceFactory.forNetwork(networkId).transactionService().loadUnconfirmed()
            .then(unconfirmed => this.setState({
                size: unconfirmed.size,
                transactions: unconfirmed.transactions
            }));
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 5000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load unconfirmed transactions">
                <UnconfirmedTxList transactions={this.state.transactions} count={this.state.size}/>
            </Loader>
        );
    }
}

export const RoutedUnconfirmedTxListContainer = withRouter(UnconfirmedTxListContainer);
