import React from 'react';
import PropTypes from 'prop-types';

import {routeBuilder} from './shared/Routing';
import NavMenuItem from './NavMenuItem';

const buildItems = () => {
    return [{
        title: 'General info',
        route: networkId => routeBuilder(networkId).root,
    }, {
        title: 'Blocks',
        route: networkId => routeBuilder(networkId).blocks.list
    }, {
        title: 'Peers',
        route: networkId => routeBuilder(networkId).peers.list
    }, {
        title: 'Nodes',
        route: networkId => routeBuilder(networkId).nodes.list
    }];
};

export default class NavMenu extends React.Component {
    static propTypes = {
        networkId: PropTypes.string
    };

    constructor(props) {
        super(props);

        const items = buildItems();
        this.state = {
            items,
            current: items[0]
        };
    }

    handleNavigate = item => {
        this.setState({
            current: item
        });
    };

    render() {
        return (
            <div className="menu-list">
                {this.state.items.map((item, index) => {
                    const current = this.state.current === item;
                    return (
                        <NavMenuItem
                            key={index}
                            networkId={this.props.networkId}
                            item={item} current={current}
                            onNavigate={this.handleNavigate}
                        />
                    );
                })}
            </div>
        );
    }
}
