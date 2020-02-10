import React from 'react';
import PropTypes from 'prop-types';

import {GatewayListItem} from './GatewayListItem.view';

export class GatewayList extends React.Component {
    static propTypes = {
        gateways: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="nodes table-sm-transform">
                <thead>
                    <tr>
                        <th className="name">Gateway</th>
                        <th className="maintainer">Maintainer</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.gateways.map((gateway, index) => {
                        return (<GatewayListItem key={index} gateway={gateway} />);
                    })}
                </tbody>
            </table>
        );
    }
}
