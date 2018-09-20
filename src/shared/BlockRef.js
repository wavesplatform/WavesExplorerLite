import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from './Routing';

class BlockRef extends React.PureComponent {
    static propTypes = {
        height: PropTypes.number.isRequired
    };

    render() {
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);
        const {height} = this.props;

        return (<Link to={routes.blocks.one(height)}>{height}</Link>);
    }
}

export default withRouter(BlockRef);
