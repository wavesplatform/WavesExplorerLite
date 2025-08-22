import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';
import {withRouter} from "../../withRouter";

class TransactionRef extends React.PureComponent {
    static propTypes = {
        txId: PropTypes.string.isRequired,
        text: PropTypes.string,
    };

    render() {
        const text = this.props.text || this.props.txId;
        const {networkId} = this.props.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.transactions.one(this.props.txId)} className={this.props.className}>{text}</Link>);
    }
}

export const RoutedTransactionRef = withRouter(TransactionRef);
