import React from 'react';
import PropTypes from 'prop-types';

import AssetRef from '../../components/AssetRef';

export class NonFungibleTokenListItem extends React.PureComponent {
    static propTypes = {
        token: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }).isRequired
    };

    render() {
        const {token} = this.props;

        return (
            <tr>
                <td data-label="ID">
                    <div className="line no-wrap"><AssetRef assetId={token.id}/></div>
                </td>
                <td data-label="Name">
                    <div className="line">{token.name}</div>
                </td>
            </tr>
        );
    }
}
