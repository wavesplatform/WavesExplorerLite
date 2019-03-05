import React from 'react';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../Components/Loader';
import PeerList from './PeerList';

export default class PeersPage extends React.Component {
    state = {
        peers: []
    };

    componentDidMount() {
        const event = new EventBuilder().peers().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .peersService()
            .loadPeers()
            .then(peers => this.setState({peers}));
    };

    render() {
        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.fetchData} errorTitle="Failed to load peer details">
                    <div className="content card">
                        <div className="headline">
                            <span className="title">Peers</span>
                            <label className="right">
                                <span>Connected </span>
                                <span className="bold">{this.state.peers.length}</span>
                            </label>
                        </div>
                        <PeerList peers={this.state.peers} />
                    </div>
                </Loader>
            </div>
        );
    }
}
