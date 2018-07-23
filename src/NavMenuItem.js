import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class NavMenuItem extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        route: PropTypes.string.isRequired,
        current: PropTypes.bool,
    };

    static defaultProps = {
        current: false
    }

    render() {
        let className = 'menu-item';
        if (this.props.current)
            className += ' current';

        return (
            <Link className={className} to={this.props.route}>{this.props.title}</Link>
        );
    }
}
