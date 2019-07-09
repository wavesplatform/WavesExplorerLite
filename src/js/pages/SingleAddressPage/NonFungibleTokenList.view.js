import React from 'react';
import PropTypes from 'prop-types';

import {NonFungibleTokenListItem} from './NonFungibleTokenListItem.view';

export class NonFungibleTokenList extends React.Component {
    static propTypes = {
        tokens: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="table-sm-transform">
                <thead>
                <tr>
                    <th>ID</th>
                    <th className="width-30">Name</th>
                </tr>
                </thead>
                <tbody>
                {this.props.tokens.map((token) => {
                    return (<NonFungibleTokenListItem key={token.id} token={token} />);
                })}
                </tbody>
            </table>
        );
    }
}
