import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {NonFungibleTokenListView} from './NonFungibleTokenList.view';

const TX_PAGE_SIZE = 100;

class NonFungibleTokenListContainer extends React.Component {
    state = {
        tokens: [],
        loading: false,
        hasMore: true
    };

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService
            .loadNftTokens(address)
            .then(tokens => this.setState({
                tokens,
                hasMore: tokens.length === TX_PAGE_SIZE
            }));
    };

    loadMore = (after) => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadNftTokens(address, TX_PAGE_SIZE, after);
    };

    handleMore = () => {
        if (this.state.tokens.length < 1)
            return;

        if (this.state.loading)
            return;

        this.setState({loading: true});
        const next = this.state.tokens[this.state.tokens.length - 1].id;

        this.props.loadMore(next).then(tokens => {
            this.setState(prevState => ({
                tokens: prevState.tokens.concat(tokens),
                loading: false,
                hasMore: tokens.length === TX_PAGE_SIZE
            }))
        });
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load non-fungible tokens">
                <NonFungibleTokenListView
                    tokens={this.state.tokens}
                    hasMore={this.state.hasMore}
                    loadMore={this.handleMore}
                />
            </Loader>
        );
    }
}

const RoutedNonFungibleTokensListContainer = withRouter(NonFungibleTokenListContainer);

export default RoutedNonFungibleTokensListContainer;
