import React from 'react';
import PropTypes from 'prop-types';

import AssetRef from '../../components/AssetRef';

export class AssetListItem extends React.PureComponent {
    static propTypes = {
        asset: PropTypes.object.isRequired
    };

    render() {
        const {asset} = this.props;
        return (
            <tr>
                <td data-label="ID">
                    <div className="line no-wrap"><AssetRef assetId={asset.id}/></div>
                </td>
                <td data-label="Name">
                    <div className="line">{asset.name}</div>
                </td>
                <td data-label="Balance">
                    <div className="line">{asset.amount}</div>
                </td>
            </tr>
        );
    }
}
