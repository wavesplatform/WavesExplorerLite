import React from 'react';
import PropTypes from 'prop-types';

import {NonFungibleTokenListView} from './NonFungibleTokenList.view';

export class NonFungibleTokenListContainer extends React.Component {
    static propTypes = {
        tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
        pageSize: PropTypes.number.isRequired,
        loadMore: PropTypes.func.isRequired
    };

    state = {
        tokens: this.props.tokens,
        loading: false,
        hasMore: this.props.tokens.length === this.props.pageSize
    };

    componentDidUpdate(prevProps) {
        if (prevProps.tokens.length !== this.props.tokens.length) {
            this.setState({
                tokens: this.props.tokens,
                hasMore: this.props.tokens.length === this.props.pageSize
            });
        }
    }

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
                hasMore: tokens.length === this.props.pageSize
            }))
        });
    };

    render() {
        return (
            <NonFungibleTokenListView
                tokens={this.state.tokens}
                hasMore={this.state.hasMore}
                loadMore={this.handleMore}
            />
        );
    }
}
