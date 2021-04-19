import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {NetworkInfo} from './NetworkInfo.view';

class NetworkInfoContainer extends React.Component {
    state = {
        info: {}
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        const infoService = ServiceFactory.forNetwork(networkId).infoService();
        return infoService.loadInfo().then(info => {
            const change = Object.assign({}, this.state.info, info);
            this.setState({info: change});

            infoService.loadDelay(info).then(info => this.setState({info}));
        });
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 10000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load blockchain info">
                <NetworkInfo info={this.state.info} />
            </Loader>
        );
    }
}

export const RoutedNetworkInfoContainer = withRouter(NetworkInfoContainer);
