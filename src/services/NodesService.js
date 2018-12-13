import axios from 'axios';
import configuration from 'configuration';

import {nodeApi} from '../shared/NodeApi';

export class NodesService {
    loadNodes = () => {
        const nodes = configuration.nodes.slice();

        const promises = nodes.map((node, index) => {
            const api = nodeApi(node.url);
            return axios.all([
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

                return {
                    index,
                    node: newNode
                };
            }))
        });

        return Promise.all(promises).then(values => {
            values.forEach(item => {
                nodes[item.index] = item.node;
            });

            return nodes;
        });
    }
}
