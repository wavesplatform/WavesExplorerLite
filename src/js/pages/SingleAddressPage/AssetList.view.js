import React from 'react';
import PropTypes from 'prop-types';

import {AssetListItem} from './AssetListItem.view';

export class AssetList extends React.Component {
    static propTypes = {
        assets: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="table-sm-transform">
                <thead>
                <tr>
                    <th>ID</th>
                    <th className="width-25">Name</th>
                    <th className="width-25">Balance</th>
                </tr>
                </thead>
                <tbody>
                {this.props.assets.map((asset, index) => {
                    return (<AssetListItem key={index} asset={asset} />);
                })}
                </tbody>
            </table>
        );
    }
}
