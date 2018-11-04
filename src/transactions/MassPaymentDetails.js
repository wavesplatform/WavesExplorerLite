import React from 'react';
import PropTypes from 'prop-types';

const TransferListItem = ({transfer}) => {
    return (
        <tr>
            <td data-label="Recipient">
                <div className="line no-wrap"><AddressRef address={transfer.recipient}/></div>
            </td>
            <td data-label="Amount">
                <div className="line">{transfer.amount} WAVES</div>
            </td>
        </tr>
    );
};

TransferListItem.propTypes = {
    transfer: PropTypes.shape({
        recipient: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    })
};

const TransferList = ({transfers}) => {
    return (
        <table className="table-sm-transform">
            <thead>
            <tr>
                <th>Recipient</th>
                <th className="width-30">Amount</th>
            </tr>
            </thead>
            <tbody>
            {transfers.map(item => {
                return <TransferListItem key={item.recepient} transfer={item}/>
            })}
            </tbody>
        </table>
    );
};

TransferList.propTypes = {
    transfers: PropTypes.arrayOf(TransferListItem.propTypes.transfer)
};

export default class MassPaymentDetails extends React.PureComponent {
    static propTypes = {
        tx: PropTypes.object.isRequired
    };

    render() {
        const {tx} = this.props;
        if (tx.type !== 11)
            return null;

        return (
            <React.Fragment>
                <div className="headline2">
                    <span className="title">Transfers</span>
                </div>
                <TransferList transfers={tx.transfers} />
            </React.Fragment>
        );
    }
}
