import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routes} from './Routing';

class BlockRef extends React.PureComponent {
    static propTypes = {
        height: PropTypes.number.isRequired
    };

    render() {
        const {height} = this.props;

        return (<Link to={routes.blocks.one(height)}>{height}</Link>);
    }
}

export default BlockRef;
