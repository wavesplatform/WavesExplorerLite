import React from 'react';

import AddressRef from '../shared/AddressRef';
import TransactionRef from '../shared/TransactionRef';
import TransactionArrow from '../shared/TransactionArrow';

//TODO: transaction components for block page live here

export const createListItem = type => {
    return (
        <tr>
            <td data-label="ID / Timestamp">
                <div className="line no-wrap"><TransactionRef
                    txId="CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS"/></div>
                <div className="line"><label>00:00:00, 00.00.0000</label></div>
            </td>
            <td data-label="Sender / Recipient">
                <TransactionArrow type={type} />
                <div className="line no-wrap"><AddressRef address="3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he"
                                                          appearance="regular"/></div>
                <div className="line no-wrap"><AddressRef address="3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3"
                                                          appearance="regular"/></div>
            </td>
            <td data-label="Amount / Fee">
                <div className="line">1000.0000000</div>
                <div className="line"><label>0.001 WAVES</label></div>
            </td>
            <td data-label="Price">
                <div className="line"><a>XDTC</a></div>
            </td>
        </tr>
    )
};
