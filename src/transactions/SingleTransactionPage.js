import React from 'react';

import GoBack from '../shared/GoBack';
import AddressRef from '../shared/AddressRef';

export default class SingleTransactionPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <GoBack />
                <div className="headline">
                  <span className="title">Transaction</span>
                  <span className="title-details"> / Gao1YppNQqyFXSSBB8gr9GaUvzZJ3EUknajWwvMHFm2c</span>
                  <span className="btn btn-copy">Copy</span>
                </div>
                <div className="dictionary">
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Type</div>
                    <div className="dictionary-pair-value">
                      <span>11</span>
                      <span className="badge">Mass Payment</span>
                    </div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Timestamp</div>
                    <div className="dictionary-pair-value">00:00:00, 00.00.0000</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Block</div>
                    <div className="dictionary-pair-value"><a>1049538</a></div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Total amount</div>
                    <div className="dictionary-pair-value">187018.70127952 Secrect Sendicate</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Transfers count</div>
                    <div className="dictionary-pair-value">88</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Description</div>
                    <div className="dictionary-pair-value"><span className="bold">Text</span></div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Fee</div>
                    <div className="dictionary-pair-value">0.045 WAVES</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Sender</div>
                    <div className="dictionary-pair-value"><AddressRef address="3PPiviBs3S2Q7yCB4LdvwViYFqr4dXr8RZt"/></div>
                  </div>
                </div>
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
