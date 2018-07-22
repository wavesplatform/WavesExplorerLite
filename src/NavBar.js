import React from 'react';

import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

export default class NavBar extends React.Component {
    state = {
        networkId: 'mainnet'
    };

    handleNetworkChange = networkId => {
        this.setState({networkId});
    }

    render() {
        return (
            <div className="menu grid-item-fixed lg-hide">
                <NetworkSwitch value={this.state.networkId} onChange={this.handleNetworkChange} />
                <NavMenu />
                <Footer version="v1.1.7" />
            </div>
        );
    }
}
