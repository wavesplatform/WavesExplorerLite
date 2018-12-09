import React from 'react';

import {api} from '../shared/NodeApi';
import PeerList from './PeerList';

export default class PeersPage extends React.Component {

    state = {
        peers: []
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        api.peers().then(response => {
            const peers = response.data.peers.map(item => ({
                address: item.address,
                declaredAddress: item.declaredAddress,
                name: item.peerName,
                nonce: item.peerNonce
            }));

            this.setState({peers});
        });
    }

    render() {
        return (
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
        );
    }
}
