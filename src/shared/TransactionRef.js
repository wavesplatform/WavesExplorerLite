import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routes} from './Routing';

class TransactionRef extends React.PureComponent {
    static propTypes = {
        txId: PropTypes.string.isRequired,
        text: PropTypes.string
    };

    render() {
        const text = this.props.text || this.props.txId;

        return (<Link to={routes.transactions.one(this.props.txId)}>{text}</Link>);
    }
}

export default TransactionRef;
