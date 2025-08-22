import React from 'react';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';
import {withRouter} from "../../withRouter";

class LeaseRef extends React.PureComponent {
    render() {
        const props = this.props;
        const {networkId} = this.props.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.leases.one(props.leaseId)}>{props.leaseId}</Link>);
    }
}

export const RoutedLeaseRef = withRouter(LeaseRef);
