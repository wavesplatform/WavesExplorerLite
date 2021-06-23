import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';

class TransactionRef extends React.PureComponent {
    static propTypes = {
        txId: PropTypes.string.isRequired,
        text: PropTypes.string,
    };

    render() {
        console.log(this.props)
        const text = this.props.text || this.props.txId;
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);

        return (<Link to={routes.transactions.one(this.props.txId)} className={this.props.className}>{text}</Link>);
    }
}

export const RoutedTransactionRef = withRouter(TransactionRef);
