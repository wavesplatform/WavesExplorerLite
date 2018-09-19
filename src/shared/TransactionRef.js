import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from './Routing';

class TransactionRef extends React.PureComponent {
    static propTypes = {
        txId: PropTypes.string.isRequired
    };

    render() {
        console.log(this.props);
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.transactions.one(this.props.txId)}>{this.props.txId}</Link>);
    }
}

export default withRouter(TransactionRef);
