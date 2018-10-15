import React from 'react';
import axios from 'axios';

import {create} from '../configuration';
import {nodeApi} from '../shared/NodeApi';
import NodeList from './NodeList';

export default class NodesPage extends React.Component {
    constructor(props) {
        super(props);

        const configuration = create(this.props.match.params.networkId);
        this.state = {
            nodes: [...configuration.nodes]
        };
    }

    componentDidMount() {
        this.state.nodes.map((node, index) => {
            //TODO: move this to a service
            const api = nodeApi(node.url);
            axios.all([
                api.version(),
                api.blocks.height(),
                api.baseTarget(),
                api.transactions.utxSize()
            ]).then(axios.spread((version, height, baseTarget, unconfirmedTxCount) => {
                const newNode = {
                    ...node,
                    version: version.data.version,
                    height: height.data.height,
                    baseTarget: baseTarget.data.baseTarget,
                    unconfirmedTxCount: unconfirmedTxCount.data.size
                };
                const array = this.state.nodes.slice();
                array[index] = newNode;
                this.setState({
                    nodes: array
                });
            }));
        });
    }

    render() {
        const configuration = create(this.props.match.params.networkId);

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
                    <span className="title">{configuration.displayName} Nodes</span>
                </div>
                <NodeList nodes={this.state.nodes} />
            </React.Fragment>
        );
    }
}
