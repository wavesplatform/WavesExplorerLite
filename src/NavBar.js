import React from 'react';
import PropTypes from 'prop-types';
import configuration from 'configuration';

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

    switchNetwork = url => {
        window.open(url, '_blank');
    };

    render() {
        const current = {
            title: configuration.displayName,
            url: window.location.href
        };

        let className = 'menu grid-item-fixed';
        if (this.props.appearance === REGULAR_APPEARANCE)
            className += ' lg-hide';

        const version = __VERSION__ || '0';

        return (
            <div className={className}>
                <NetworkSwitch current={current} peers={configuration.peerExplorers} onSwitchNetwork={this.switchNetwork} />
                <NavMenu />
                <Footer version={version} />
            </div>
        );
    }
}

export default NavBar;
