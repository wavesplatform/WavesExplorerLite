import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from './Routing';

class TransactionRef extends React.PureComponent {
    static propTypes = {
        txId: PropTypes.string.isRequired,
        text: PropTypes.string
    };

    render() {
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);
        const text = this.props.text || this.props.txId;

        return (<Link to={routes.transactions.one(this.props.txId)}>{text}</Link>);
    }
}

export default withRouter(TransactionRef);
