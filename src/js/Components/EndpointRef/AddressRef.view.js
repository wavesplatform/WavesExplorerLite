import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';

export class AddressRef extends React.PureComponent {
    static propTypes = {
        networkId: PropTypes.string,
        address: PropTypes.string.isRequired,
        title: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {address, className} = this.props;
        const title = this.props.title || address;
        const routes = routeBuilder(this.props.networkId);

        return (<Link to={routes.addresses.one(address)} className={className}>{title}</Link>);
    }
}
