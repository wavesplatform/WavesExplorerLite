import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';
import {withRouter} from "../../withRouter";

class AssetRef extends React.PureComponent {
    static propTypes = {
        assetId: PropTypes.string.isRequired,
        text: PropTypes.string,
    };

    render() {
        const text = this.props.text || this.props.assetId;
        const {networkId} = this.props.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.assets.one(this.props.assetId)} className={this.props.className}>{text}</Link>);
    }
}

export const RoutedAssetRef = withRouter(AssetRef);
