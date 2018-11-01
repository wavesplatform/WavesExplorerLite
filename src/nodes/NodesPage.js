import React from 'react';
import axios from 'axios';

import {create} from '../configuration';
import {nodeApi} from '../shared/NodeApi';
import NodeList from './NodeList';

export default class NodesPage extends React.Component {

    state = {
        nodes: []
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData() {
        const configuration = create(this.props.match.params.networkId);
        this.setState({nodes: [...configuration.nodes]}, this.fetchNodesDetails);
    }

    fetchNodesDetails() {
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
