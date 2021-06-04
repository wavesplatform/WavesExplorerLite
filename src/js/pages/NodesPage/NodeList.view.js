import React from 'react';
import PropTypes from 'prop-types';

import {NodeListItem} from './NodeListItem.view';

export class NodeList extends React.Component {
    static propTypes = {
        nodes: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="nodes table-sm-transform">
                <thead>
                    <tr>
                        <th>Node</th>
                        <th className="version">Version</th>
                        <th className="height">Current height</th>
                        <th className="target">Base target</th>
                        <th className="utxs">UTxs</th>
                        <th className="txs">Maintainer</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.nodes.map((node, index) => {
                        return (<NodeListItem key={index} node={node} />);
                    })}
                </tbody>
            </table>
        );
    }
}
