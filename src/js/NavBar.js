import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {routeBuilder} from './shared/Routing';
import NavMenu from './NavMenu';
import Footer from './Footer';
import NetworkSwitch from './NetworkSwitch';

import EventBuilder from './shared/analytics/EventBuilder';
import ServiceFactory from './services/ServiceFactory';

const REGULAR_APPEARANCE = 'regular';

const reloadWindow = () => window.location.reload();

class NavBar extends React.Component {
    static propTypes = {
        appearance: PropTypes.string,
        onAfterNavigate: PropTypes.func
    };

    static defaultProps = {
        appearance: REGULAR_APPEARANCE,
        onAfterNavigate: () => {}
    };

    switchNetwork = networkId => {
        const event = new EventBuilder().settings().events().networkSelected(networkId).build();
        ServiceFactory.global().analyticsService().sendEvent(event);

        const defaultNetwork = ServiceFactory.global().configurationService().default();
        const route = routeBuilder(defaultNetwork.networkId !== networkId ? networkId : null);
        this.props.history.push(route.root);
    };

    applySettings = settings => {
        const event = new EventBuilder().settings().events().customSettingsApplied(settings.apiBaseUrl).build();
        ServiceFactory.global().analyticsService().sendEvent(event);

        ServiceFactory.global().configurationService().update(settings);
        this.forceUpdate();
        reloadWindow();
    };

    render() {
        const networkId = this.props.match.params.networkId;
        const configurationService = ServiceFactory.global().configurationService();

        let className = 'menu grid-item-fixed';
        if (this.props.appearance === REGULAR_APPEARANCE)
            className += ' lg-hide';

        const version = __VERSION__ || '0';

        return (
            <div className={className}>
                <NetworkSwitch
                    current={configurationService.get(networkId)}
                    networks={configurationService.all()}
                    custom={configurationService.custom()}
                    onSwitchNetwork={this.switchNetwork}
                    onUpdateCustomNetwork={this.applySettings}
                />
                <NavMenu onAfterNavigate={this.props.onAfterNavigate} />
                <Footer version={version} />
            </div>
        );
    }
}

export default withRouter(NavBar);
