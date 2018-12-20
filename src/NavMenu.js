import React from 'react';

import {routes} from './shared/Routing';
import NavMenuItem from './NavMenuItem';

const items = [{
    title: 'General info',
    route: routes.root,
    icon: 'icon-general'
}, {
    title: 'Blocks',
    route: routes.blocks.list,
    icon: 'icon-blocks'
}, {
    title: 'Peers',
    route: routes.peers.list,
    icon: 'icon-peers'
}, {
    title: 'Nodes',
    route: routes.nodes.list,
    icon: 'icon-nodes'
}];

export default class NavMenu extends React.Component {
    constructor(props) {
        super(props);

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
                            item={item} current={current}
                            onNavigate={this.handleNavigate}
                        />
                    );
                })}
            </div>
        );
    }
}
