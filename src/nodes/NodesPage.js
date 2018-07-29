import React from 'react';

import NodeList from './NodeList';

export default class NodesPage extends React.Component {
    render() {
        const nodes = [{
            url: 'https://nodes.wavesnodes.com',
            version: 'Waves v0.13.3',
            height: 1041481,
            baseTarget: 54,
            unconfirmedTxCount: 5,
            maintainer: 'Waves'
        }, {
            url: 'https://nodes.wavesnodes.com',
            version: 'Waves v0.13.3',
            height: 1041481,
            baseTarget: 54,
            unconfirmedTxCount: 5,
            maintainer: 'Waves'
        }];

        return (
            <React.Fragment>
                <div className="headline">
                    <span className="title">{this.props.match.params.networkId} Nodes</span>
                </div>
                <NodeList nodes={nodes} />
            </React.Fragment>
        );
    }
}
