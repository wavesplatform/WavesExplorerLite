import React from 'react';
import PropTypes from 'prop-types';

import NavMenuItem from './NavMenuItem';

export default class NavMenu extends React.PureComponent {
    render() {
        const items = [{
            title: 'General info',
            route: '',
            current: true
        }, {
            title: 'Blocks',
            route: ''
        }, {
            title: 'Peers',
            route: ''
        }, {
            title: 'Nodes',
            route: ''
        }];

        return (
            <div className="menu-list">
                {items.map((item, index) => {
                    return (<NavMenuItem key={index} {...item} />);
                })}
            </div>
        );
    }
}
