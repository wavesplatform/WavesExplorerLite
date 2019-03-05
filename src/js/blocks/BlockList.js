import React from 'react';
import PropTypes from 'prop-types';

import BlockListItem from './BlockListItem';

export default class BlockList extends React.Component {
    static propTypes = {
        blocks: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="blocks table-sm-transform">
                <thead>
                    <tr>
                        <th className="timestamp">№ / Timestamp</th>
                        <th className="target nowrap">Base Target</th>
                        <th>Generator / Signature</th>
                        <th className="txs">TXs</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.blocks.map((block, index) => {
                    return (<BlockListItem key={index} block={block} />);
                })}
                </tbody>
            </table>
        );
    }
}
