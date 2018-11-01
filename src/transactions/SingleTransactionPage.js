import React from 'react';

import {apiBuilder} from '../shared/NodeApi';
import GoBack from '../shared/GoBack';
import AddressRef from '../shared/AddressRef';
import BlockRef from '../shared/BlockRef';
import Headline from '../shared/Headline';
import TransactionBadge from '../shared/TransactionBadge';
import Dictionary from '../shared/Dictionary';

const transactionToDictionaryItems = (tx) => {
    switch (tx.type) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            return massPaymentTransactionToItems(tx);

        default:
            return [];
    }
};

const massPaymentTransactionToItems = tx => {
    const items = [{
        label: 'Total amount',
        value: '187018.70127952 Secrect Sendicate'
    }, {
        label: 'Transfers count',
        value: '88'
    }, {
        label: 'Description',
        value: <span className="bold">Text</span>
    }];

    return [...transactionHeaderItems(tx), ...items, createFeeItem(tx), createSenderItem(tx)];
};

const transactionHeaderItems = tx => {
    return [{
        label: 'Type',
        value: <React.Fragment><span>{tx.type}</span><TransactionBadge type={tx.type} /></React.Fragment>
    }, {
        label: 'Timestamp',
        value: tx.timestamp.toLongString(),
    }, {
        label: 'Block',
        value: <BlockRef height={tx.height} />
    }];
};

const createSenderItem = tx => {
    return {
        label: 'Sender',
        value: <AddressRef address={tx.sender} />
    };
};

const createFeeItem = tx => {
    return {
        label: 'Fee',
        value: tx.fee
    };
};

const createAmountItem = tx => {
    return {
        label: 'Amount',
        value: tx.amount
    };
};

export default class SingleTransactionPage extends React.Component {
    state = {
        tx: {
            id: this.props.match.params.transactionId
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData() {
        const {networkId, transactionId} = this.props.match.params;
        const api = apiBuilder(networkId);

        api.transactions.info(transactionId).then(infoResponse => {
            this.setState({tx: infoResponse.data});
        });
    }

    render() {
        const transactionItems = transactionToDictionaryItems(this.state.tx);

        return (
            <React.Fragment>
                <GoBack />
                <Headline title="Transaction" subtitle={this.state.tx.id} />
                <Dictionary items={transactionItems}/>
                <div className="headline2">
                  <span className="title">Transfers</span>
                </div>
                <table className="table-sm-transform">
                  <thead>
                  <tr>
                    <th>Recipient</th>
                    <th className="width-30">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td data-label="Recipient">
                      <div className="line no-wrap"><AddressRef address="3P7LBF2XPmchND9PnmC8gjbb2SfovPHJB9K"/></div>
                    </td>
                    <td data-label="Amount">
                      <div className="line">2125.21251454 WAVES</div>
                    </td>
                  </tr>
                  <tr>
                    <td data-label="Recipient">
                      <div className="line no-wrap"><AddressRef address="3P7LBF2XPmchND9PnmC8gjbb2SfovPHJB9K"/></div>
                    </td>
                    <td data-label="Amount">
                      <div className="line">2125.21251454 WAVES</div>
                    </td>
                  </tr>
                  </tbody>
                </table>
            </React.Fragment>
        );
    }
}
