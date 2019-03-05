import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from './Routing';

class AssetRef extends React.PureComponent {
    static propTypes = {
        assetId: PropTypes.string.isRequired,
        text: PropTypes.string
    };

    render() {
        const text = this.props.text || this.props.assetId;
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.assets.one(this.props.assetId)}>{text}</Link>);
    }
}

export default withRouter(AssetRef);
