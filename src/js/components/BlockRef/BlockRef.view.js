import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';

class BlockRef extends React.PureComponent {
    static propTypes = {
        height: PropTypes.number.isRequired
    };

    render() {
        const {height} = this.props;
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.blocks.one(height)}>{height}</Link>);
    }
}

export const RoutedBlockRef = withRouter(BlockRef);
