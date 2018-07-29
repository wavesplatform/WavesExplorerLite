import React from 'react';

import PeerList from './PeerList';

export default class PeersPage extends React.Component {
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
                        <span className="bold">{peers.length}</span>
                    </label>
                </div>
                <PeerList peers={peers} />
            </React.Fragment>
        );
    }
}
