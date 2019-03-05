import React from 'react';
import PropTypes from 'prop-types';

import PeerListItem from './PeerListItem';

export default class PeerList extends React.Component {
    static propTypes = {
        peers: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="table-sm-transform">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Declared address</th>
                        <th>Node name</th>
                        <th>Node nonce</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.peers.map((peer, index) => {
                    return (<PeerListItem key={index} peer={peer} />);
                })}
                </tbody>
            </table>
        );
    }
}
