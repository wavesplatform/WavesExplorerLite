import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

export default class NavMenuItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        networkId: PropTypes.object.isRequired,
        current: PropTypes.bool
    };

    static defaultProps = {
        current: false
    };

    handleClick = () => {
        this.props.onNavigate(this.props.item);
    }

    render() {
        let className = 'menu-item';
        if (this.props.current)
            className += ' current';

        // move this to url builder
        let to = '/' + this.props.networkId;
        if (this.props.item.route) {
            to += this.props.item.route;
        }

        return (
            <div className={className}>
                <Link
                    className="no-style"
                    to={to}
                    onClick={this.handleClick}>{this.props.item.title}</Link>
            </div>
        );
    }
}
