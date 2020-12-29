import React from 'react';
import PropTypes from 'prop-types';

import {typeToTitle} from '../../shared/TransactionDefinitions';
import {createListItem} from './TransactionListItem';

export class TransactionList extends React.Component {
    static propTypes = {
        type: PropTypes.number.isRequired,
        header: PropTypes.shape({
            id: PropTypes.string,
            subjects: PropTypes.string,
            amount: PropTypes.string,
            price: PropTypes.string
        }),
        transactions: PropTypes.arrayOf(PropTypes.object)
    };

    state = {
        collapsed: false
    };

    handleClick = () => {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    };

    render() {
        const actionTitle = this.state.collapsed ? 'Show list' : 'Hide list';
        let tableClass = 'table-sm-transform';
        if (this.state.collapsed) {
            tableClass += ' table-hide';
        }
        return (
            <React.Fragment>
                <div className="headline2">
                    <span className="title">{typeToTitle(this.props.type)}</span>
                    <span className="title-details"> — Type {this.props.type} ({this.props.transactions.length})</span>
                    <span className="action" onClick={this.handleClick}>{actionTitle}</span>
                </div>
                <table className={tableClass}>
                    <thead>
                    <tr>
                        <th>{this.props.header.id}</th>
                        <th>{this.props.header.subjects}</th>
                        <th className="amount">{this.props.header.amount}</th>
                        <th className="price">{this.props.header.price}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.transactions.map(item => {
                        console.log('item', item)
                        return createListItem(item);
                    })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}
