import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import {routeBuilder} from './shared/Routing';
import NavMenuItem from './NavMenuItem';

const buildItems = () => {
    return [{
        title: 'General info',
        route: networkId => routeBuilder(networkId).root,
        icon: 'icon-general'
    }, {
        title: 'Blocks',
        route: networkId => routeBuilder(networkId).blocks.list,
        icon: 'icon-blocks'
    }, {
        title: 'Peers',
        route: networkId => routeBuilder(networkId).peers.list,
        icon: 'icon-peers'
    }, {
        title: 'Nodes',
        route: networkId => routeBuilder(networkId).nodes.list,
        icon: 'icon-nodes'
    }];
};

class NavMenu extends React.Component {
    static propTypes = {
        onAfterNavigate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {pathname} = this.props.location;
        const items = buildItems();
        this.state = {
            items,
            current: items.find(item => item.route === pathname) || items[0]
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.setState({current: this.state.items[0]}); // really?
        }
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
            </div>
        );
    }
}

export default withRouter(NavMenu);
