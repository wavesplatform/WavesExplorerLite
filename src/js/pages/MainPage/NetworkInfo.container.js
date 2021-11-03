import React from 'react';
import { withRouter } from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import { NetworkInfo } from './NetworkInfo.view';

class NetworkInfoContainer extends React.Component {
    state = {
        info: {}
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        const {networkId} = this.props.match.params;
        const infoService = ServiceFactory.forNetwork(networkId).infoService();
        return this.fetchData().then(() => {
            infoService.loadDelay(this.state.info).then(info => this.setState({info}));
            return this.setRefreshInterval
        });
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        const infoService = ServiceFactory.forNetwork(networkId).infoService();
        return infoService.loadInfo().then(info => {
            const change = Object.assign({}, this.state.info, info);
            this.setState({info: change});
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
                <NetworkInfo info={this.state.info}/>
            </Loader>
        );
    }
}

export const RoutedNetworkInfoContainer = withRouter(NetworkInfoContainer);
