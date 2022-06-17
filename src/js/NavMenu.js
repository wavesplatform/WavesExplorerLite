import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {routeBuilder} from './shared/Routing';
import NavMenuItem from './NavMenuItem';
import ServiceFactory from './services/ServiceFactory';
import { NewVersionDialog } from './components/NewVersionDialog';

const alwaysVisible = networkId => true;
const visibleIfConfigured = networkId => {
    const {faucet} = ServiceFactory.global().configurationService().get(networkId);

    return !!faucet;
};

const buildItems = () => {
    return [{
        title: 'General info',
        route: networkId => routeBuilder(networkId).root,
        visible: alwaysVisible,
        icon: 'icon-general'
    }, {
        title: 'Blocks',
        route: networkId => routeBuilder(networkId).blocks.list,
        visible: alwaysVisible,
        icon: 'icon-blocks'
    }, {
        title: 'Peers',
        route: networkId => routeBuilder(networkId).peers.list,
        visible: alwaysVisible,
        icon: 'icon-peers'
    }, {
        title: 'Nodes',
        route: networkId => routeBuilder(networkId).nodes.list,
        visible: alwaysVisible,
        icon: 'icon-nodes'
    }, {
        title: 'Faucet',
        route: networkId => routeBuilder(networkId).faucet,
        visible: visibleIfConfigured,
        icon: 'icon-faucet'
    },
    //     {
    //     title: 'Converters',
    //     route: networkId => routeBuilder(networkId).converters,
    //     visible: alwaysVisible,
    //     icon: 'icon-converters'
    // }
    ];
};

class NavMenu extends React.Component {
    static propTypes = {
        onAfterNavigate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const items = buildItems();
        this.state = {
            items,
            current: this.findItemByCurrentRoute(items) || items[0]
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            const currentItemCandidate = this.findItemByCurrentRoute(this.state.items);
            if (this.state.current !== currentItemCandidate)
                this.setState({current: currentItemCandidate});
        }
    }

    findItemByCurrentRoute(items) {
        const {pathname} = this.props.location;
        const {networkId} = this.props.match.params;

        return items.find(item => (item.route(networkId) || '/') === pathname);
    }

    handleNavigate = item => {
        this.setState({
            current: item
        });

        this.props.onAfterNavigate();
    };

    render() {
        return (
            <div className="menu-list">
                {this.state.items.map((item, index) => {
                    const current = this.state.current === item;
                    return (
                        <NavMenuItem
                            key={index}
                            item={item} current={current}
                            onNavigate={this.handleNavigate}
                        />
                    );
                })}
                <NewVersionDialog />
            </div>
        );
    }
}

export default withRouter(NavMenu);
