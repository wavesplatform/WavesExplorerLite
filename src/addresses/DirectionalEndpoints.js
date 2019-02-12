import React from 'react';

import Address from './Address';
import {TransactionDirections} from '../shared/TransactionDefinitions';

const DirectionalEndpoints = ({direction, sender, recipient}) => {
    if (direction === TransactionDirections.OUTGOING) {
        return (
            <React.Fragment>
                <div className="line no-wrap">{recipient ? <Address address={recipient} /> : '\u00A0'}</div>
                <div className="line no-wrap"><Address address={sender} /></div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className="line no-wrap"><Address address={sender} /></div>
            <div className="line no-wrap"><Address address={recipient} /></div>
        </React.Fragment>
    );
};

export default DirectionalEndpoints;
