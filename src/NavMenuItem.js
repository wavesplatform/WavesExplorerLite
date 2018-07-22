import React from 'react';
import PropTypes from 'prop-types';

export default class NavMenuItem extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        route: PropTypes.string,
        current: PropTypes.bool
    };

    static defaultProps = {
        current: false
    }

    render() {
        let className = 'menu-item';
        if (this.props.current)
            className += ' current';

        return (
            <div className={className}>{this.props.title}</div>
        );
    }
}
