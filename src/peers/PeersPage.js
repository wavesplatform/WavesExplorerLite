import React from 'react';

import {apiBuilder} from '../shared/NodeApi';
import PeerList from './PeerList';

export default class PeersPage extends React.Component {

    state = {
        peers: []
    };

    componentDidMount() {
        const api = apiBuilder(this.props.match.params.networkId);
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
        const peers = [{
            address: '/52.8.224.179:43164',
            declaredAddress: '/52.8.224.179:6868',
            name: 'waves-official-eu-node-16',
            nonce: 539056
        }, {
            address: '/52.8.224.179:43164',
            declaredAddress: '/52.8.224.179:6868',
            name: 'waves-official-eu-node-16',
            nonce: 539056
        }, {
            address: '/52.8.224.179:43164',
            declaredAddress: '/52.8.224.179:6868',
            name: 'waves-official-eu-node-16',
            nonce: 539056
        }, {
            address: '/52.8.224.179:43164',
            declaredAddress: '/52.8.224.179:6868',
            name: 'waves-official-eu-node-16',
            nonce: 539056
        }];

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
