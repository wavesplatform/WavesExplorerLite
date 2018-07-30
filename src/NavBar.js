import React from 'react';

import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

export default class NavBar extends React.Component {
    handleNetworkChange = networkId => {
        this.props.history.push(`/${networkId}`);
    }

    render() {
        return (
            <div className="menu grid-item-fixed lg-hide">
                <NetworkSwitch value={this.props.match.params.networkId} onChange={this.handleNetworkChange} />
                <NavMenu networkId={this.props.match.params.networkId} />
                <Footer version="v1.1.7" />
            </div>
        );
    }
}
