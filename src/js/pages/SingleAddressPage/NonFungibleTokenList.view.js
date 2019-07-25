import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import {Loading} from '../../components/Loader/Loading.view';

import {NonFungibleTokenListItem} from './NonFungibleTokenListItem.view';

export class NonFungibleTokenListView extends React.Component {
    static propTypes = {
        tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadMore: PropTypes.func.isRequired
    };

    render() {
        return (
            <InfiniteScroll
                initialLoad={false}
                loadMore={this.props.loadMore}
                hasMore={this.props.hasMore}
                loader={<Loading key="nft-loader"/>}>
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
            </InfiniteScroll>
        );
    }
}
