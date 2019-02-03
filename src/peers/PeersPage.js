import React from 'react';

import ServiceFactory from '../services/ServiceFactory';
import Loader from '../shared/Loader';
import PeerList from './PeerList';

export default class PeersPage extends React.Component {
    state = {
        peers: []
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
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
            <Loader fetchData={this.fetchData} errorTitle="Failed to load peer details">
                <React.Fragment>
                    <div className="headline">
                        <span className="title">Peers</span>
                        <label className="right">
                            <span>Connected </span>
                            <span className="bold">{this.state.peers.length}</span>
                        </label>
                    </div>
                    <PeerList peers={this.state.peers} />
                </React.Fragment>
            </Loader>
        );
    }
}
