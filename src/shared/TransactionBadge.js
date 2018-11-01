import React from 'react';
import PropTypes from 'prop-types';

import {typeToCssClass, typeToTitle} from '../shared/TransactionTypes';

const TransactionBadge = ({type}) => {
    const className = 'badge ' + typeToCssClass(type);
    return (
        <span className={className}>{typeToTitle(type)}</span>
    );
};

TransactionBadge.propTypes = {
    type: PropTypes.number.isRequired
};

export default TransactionBadge;
