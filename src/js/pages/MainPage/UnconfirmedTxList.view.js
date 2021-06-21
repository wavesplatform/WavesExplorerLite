import React from 'react';
import PropTypes from 'prop-types';

import {UnconfirmedTxListItem} from './UnconfirmedTxListItem.view';

export class UnconfirmedTxList extends React.Component {
    static propTypes = {
        transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
        count: PropTypes.number
    };

    static defaultProps = {
        count: 0
    };

    renderList() {
        return (
            <React.Fragment>
                <div className="panel-title">
                    <span className="title">Unconfirmed Transactions ({this.props.count})</span>
                </div>
                {this.props.transactions.map((item) => {
                    console.log(item)
                    return (<UnconfirmedTxListItem key={item.id} transaction={item}/>);
                })}
            </React.Fragment>
        );
    }

    renderEmpty() {
        return (
            <React.Fragment>
                <div className="icon"></div>
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
