import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class NavMenuItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        current: PropTypes.bool,
        onNavigate: PropTypes.func.isRequired
    };

    static defaultProps = {
        current: false
    };

    handleClick = () => {
        this.props.onNavigate(this.props.item);
    };

    render() {
        let className = 'menu-item';
        if (this.props.current)
            className += ' current';

        return (
            <div className={className}>
                <Link
                    className="no-style"
                    to={this.props.item.route}
                    onClick={this.handleClick}>{this.props.item.title}</Link>
            </div>
        );
    }
}
