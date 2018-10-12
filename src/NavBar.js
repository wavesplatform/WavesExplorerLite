import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {routeBuilder} from './shared/Routing';
import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

const REGULAR_APPEARANCE = 'regular';

class NavBar extends React.Component {
    static propTypes = {
        appearance: PropTypes.string
    };

    static defaultProps = {
        appearance: REGULAR_APPEARANCE
    };

    handleNetworkChange = networkId => {
        const route = routeBuilder(networkId);
        this.props.history.push(route.root);
    };

    render() {
        const networkId = this.props.match.params.networkId;
        let className = 'menu grid-item-fixed';
        if (this.props.appearance === REGULAR_APPEARANCE)
            className += ' lg-hide';

        return (
            <div className={className}>
                <NetworkSwitch value={networkId} onChange={this.handleNetworkChange} />
                <NavMenu networkId={networkId} />
                <Footer version="v1.1.7" />
            </div>
        );
    }
}

export default withRouter(NavBar);
