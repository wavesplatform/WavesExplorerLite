import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

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

class NavMenu extends React.Component {
    static propTypes = {
        onAfterNavigate: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {pathname} = this.props.location;

        this.state = {
            items,
            current: items.find(item => item.route === pathname) || items[0]
        };
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
