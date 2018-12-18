import React from 'react';
import PropTypes from 'prop-types';

import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

import ServiceFactory from './services/ServiceFactory';

const REGULAR_APPEARANCE = 'regular';

const extractEditableConfiguration = configuration => (
    (({apiBaseUrl, spamListUrl}) => ({apiBaseUrl, spamListUrl}))(configuration)
);

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

    applySettings = settings => {
        ServiceFactory.configurationService().update(settings);
        this.forceUpdate();
    };

    render() {
        const configurationService = ServiceFactory.configurationService();
        const current = {
            title: configurationService.get().displayName,
            url: window.location.href
        };

        let className = 'menu grid-item-fixed';
        if (this.props.appearance === REGULAR_APPEARANCE)
            className += ' lg-hide';

        const version = __VERSION__ || '0';

        const configuration = {
            currentValues: extractEditableConfiguration(configurationService.get()),
            defaultValues: extractEditableConfiguration(configurationService.default())
        };

        return (
            <div className={className}>
                <NetworkSwitch
                    current={current}
                    peers={configurationService.get().peerExplorers}
                    onSwitchNetwork={this.switchNetwork}
                    onUpdateConfiguration={this.applySettings}
                    configuration={configuration}
                />
                <NavMenu />
                <Footer version={version} />
            </div>
        );
    }
}

export default NavBar;
