import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import Loader from '../../Components/Loader';
import UnconfirmedTxListItem from './UnconfirmedTxListItem';

import ServiceFactory from '../../services/ServiceFactory';

export class UnconfirmedTxList extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    renderList() {
        return (
            <React.Fragment>
                <div className="panel-title">
                    <span className="title">Unconfirmed Transactions ({this.props.transactions.length})</span>
                </div>
                {this.props.transactions.map((item) => {
                    return (<UnconfirmedTxListItem key={item.id} transaction={item}/>);
                })}
            </React.Fragment>
        );
    }

    renderEmpty() {
        return (
            <React.Fragment>
                <div className="panel-empty-icon"></div>
                <div className="line wide panel-empty-label"><label>All transactions are confirmed</label></div>
            </React.Fragment>
        );
    }

    render() {
        const isEmpty = this.props.transactions.length === 0;
        let wrapperClassName = 'panel';
        if (isEmpty)
            wrapperClassName += ' panel-empty confirmed';

        return (
            <div className={wrapperClassName}>
                {isEmpty ? this.renderEmpty() : this.renderList()}
            </div>
        );
    }
}

class UnconfirmedTxListContainer extends React.Component {
    state = {
        unconfirmed: []
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        return ServiceFactory.forNetwork(networkId).transactionService().loadUnconfirmed()
            .then(unconfirmed => this.setState({unconfirmed}));
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 5000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load unconfirmed transactions">
                <UnconfirmedTxList transactions={this.state.unconfirmed} />
            </Loader>
        );
    }
}

export default withRouter(UnconfirmedTxListContainer);
