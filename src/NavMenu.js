import React from 'react';
import PropTypes from 'prop-types';

import NavMenuItem from './NavMenuItem';

const items = [{
    title: 'General info',
    route: '',
}, {
    title: 'Blocks',
    route: '/blocks'
}, {
    title: 'Peers',
    route: '/peers'
}, {
    title: 'Nodes',
    route: '/nodes'
}];

export default class NavMenu extends React.PureComponent {
    static propTypes = {
        networkId: PropTypes.string
    };

    state = {
        items: [...items],
        current: items[0]
    };

    handleNavigate = item => {
        this.setState({
            current: item
        });
    }

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
