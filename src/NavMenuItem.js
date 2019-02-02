import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

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
        const {networkId} = this.props.match.params;
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
