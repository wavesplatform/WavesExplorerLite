import React from 'react';
import PropTypes from 'prop-types';

import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

import ServiceFactory from './services/ServiceFactory';

const REGULAR_APPEARANCE = 'regular';

const reloadWindow = () => window.location.reload();

class NavBar extends React.Component {
    static propTypes = {
        appearance: PropTypes.string
    };

    static defaultProps = {
        appearance: REGULAR_APPEARANCE
    };

    switchNetwork = networkId => {
        ServiceFactory.configurationService().select(networkId);

        reloadWindow();
    };

    applySettings = settings => {
        ServiceFactory.configurationService().update(settings);
        this.forceUpdate();
        reloadWindow();
    };

    render() {
        const configurationService = ServiceFactory.configurationService();

        let className = 'menu grid-item-fixed';
        if (this.props.appearance === REGULAR_APPEARANCE)
            className += ' lg-hide';

        const version = __VERSION__ || '0';

        return (
            <div className={className}>
                <NetworkSwitch
                    current={configurationService.get()}
                    networks={configurationService.all()}
                    custom={configurationService.custom()}
                    onSwitchNetwork={this.switchNetwork}
                    onUpdateCustomNetwork={this.applySettings}
                />
                <NavMenu />
                <Footer version={version} />
            </div>
        );
    }
}

export default NavBar;
