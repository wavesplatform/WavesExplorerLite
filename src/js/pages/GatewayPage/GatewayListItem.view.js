import React from 'react';
import PropTypes from 'prop-types';

export class GatewayListItem extends React.Component {
    static propTypes = {
        gateway: PropTypes.object.isRequired
    };

    render() {
        const {gateway} = this.props;
        return (
            <tr>
                <td data-label="Name">
                    <div className="line no-wrap"><a href={gateway.url} target="_blank">{gateway.name}</a></div>
                </td>
                <td data-label="Maintainer">
                    <div className="line">{gateway.maintainer}</div>
                </td>
            </tr>
        );
    }
}
