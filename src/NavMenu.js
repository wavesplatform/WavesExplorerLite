import React from 'react';
import PropTypes from 'prop-types';

import NavMenuItem from './NavMenuItem';

export default class NavMenu extends React.PureComponent {
    static propTypes = {
        baseRoute: PropTypes.string
    };

    static defaultProps = {
        baseRoute: ''
    }

    render() {
        const items = [{
            title: 'General info',
            route: '',
            current: true
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

        return (
            <div className="menu-list">
                {items.map((item, index) => {
                    const route = this.props.baseRoute + item.route;
                    return (<NavMenuItem key={index} {...item} route={route} />);
                })}
            </div>
        );
    }
}
