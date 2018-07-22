import React from 'react';

import NavMenu from './NavMenu';
import Footer from './Footer';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="menu grid-item-fixed lg-hide">
                <div>
                    <div className="network-switcher">
                        <div className="current">Mainnet</div>
                        <div>Testnet</div>
                    </div>
                </div>
                <NavMenu />
                <Footer version="v1.1.7" />
            </div>
        );
    }
}
