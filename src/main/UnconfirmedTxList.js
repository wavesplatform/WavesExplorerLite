import React from 'react';
import PropTypes from 'prop-types';

import UnconfirmedTxListItem from './UnconfirmedTxListItem';

export default class UnconfirmedTxList extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        baseUrl: PropTypes.string.isRequired
    };

    renderList() {
        return (
            <React.Fragment>
                <div className="headline">
                     <div className="title">Unconfirmed Transactions ({this.props.transactions.length})</div>
                </div>
                {this.props.transactions.map((item, index) => {
                    return (<UnconfirmedTxListItem key={index} transaction={item} />);
                })}
            </React.Fragment>
        );
    }

    renderEmpty() {
        return (
            <React.Fragment>
                <div className="panel-empty-icon confirmed"></div>
                <div className="line wide panel-empty-label"><label>All transactions are confirmed</label></div>
            </React.Fragment>
        );
    }

    render() {
        const isEmpty = this.props.transactions.length === 0;
        let wrapperClassName = 'panel column-6 column-sm-12';
        if (isEmpty)
            wrapperClassName += ' panel-empty';

        return (
            <div className={wrapperClassName}>
                {isEmpty ? this.renderEmpty() : this.renderList()}
            </div>
        );
    }
}
