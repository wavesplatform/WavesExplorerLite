import React from 'react';

import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

export default class NavBar extends React.Component {
    handleNetworkChange = networkId => {
        this.props.history.push(`/${networkId}`);
    }

    render() {
        console.log(this.props);

        return (
            <div className="menu grid-item-fixed lg-hide">
                <NetworkSwitch value={this.props.match.params.networkId} onChange={this.handleNetworkChange} />
                <NavMenu baseRoute={this.props.match.url} />
                <Footer version="v1.1.7" />
            </div>
        );
    }
}
