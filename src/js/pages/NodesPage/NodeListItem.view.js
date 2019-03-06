import React from 'react';
import PropTypes from 'prop-types';

export class NodeListItem extends React.Component {
    static propTypes = {
        node: PropTypes.object.isRequired
    };

    render() {
        const {node} = this.props;
        return (
            <tr>
                <td data-label="Node">
                    <div className="line no-wrap"><a href={node.url} target="_blank">{node.url}</a></div>
                </td>
                <td data-label="Version">
                    <div className="line">{node.version}</div>
                </td>
                <td data-label="Current height">
                    <div className="line">{node.height}</div>
                </td>
                <td data-label="Base target">
                    <div className="line">{node.baseTarget}</div>
                </td>
                <td data-label="UTxs">
                    <div className="line">{node.unconfirmedTxCount}</div>
                </td>
                <td data-label="TXs">
                    <div className="line">{node.maintainer}</div>
                </td>
            </tr>
        );
    }
}
