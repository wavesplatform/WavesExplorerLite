import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withRouter} from "./withRouter";

class NavMenuItem extends React.PureComponent {
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
        const {networkId} = this.props.params;
        const visible = this.props.item.visible(networkId);
        if (!visible)
            return null;

        let className = `menu-item ${this.props.item.icon}`;
        if (this.props.current)
            className += ' current';

        return (
            <div className={className}>
                <Link
                    className="no-style"
                    to={this.props.item.route(networkId)}
                    onClick={this.handleClick}>{this.props.item.title}</Link>
            </div>
        );
    }
}

export default withRouter(NavMenuItem);
