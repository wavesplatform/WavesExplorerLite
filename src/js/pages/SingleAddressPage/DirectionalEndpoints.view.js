import React from 'react';

import Address from './Address';
import {TransactionDirections} from '../../shared/TransactionDefinitions';

export const DirectionalEndpoints = ({transaction}) => {
    if (transaction.type === 11) {
        return (
            <React.Fragment>
                <div className="line no-wrap">{transaction.transferCount} recipients</div>
                <div className="line no-wrap"><Address address={transaction.sender}/></div>
            </React.Fragment>
        );
    }


    if (transaction.direction === TransactionDirections.OUTGOING) {
        return (
            <React.Fragment>
                <div className="line no-wrap">{transaction.recipient ?
                    <Address address={transaction.recipient}/> : '\u00A0'}</div>
                <div className="line no-wrap"><Address address={transaction.sender}/></div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className="line no-wrap"><Address address={transaction.sender}/></div>
            <div className="line no-wrap"><Address address={transaction.recipient}/></div>
        </React.Fragment>
    );
};
