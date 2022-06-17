import React from 'react';
import PropTypes from 'prop-types';

import {directionToCssClass, typeToCssClass, typeToTitle} from '../../shared/TransactionDefinitions';

export const TransactionBadge = ({type, direction, isEthereum}) => {
    const className = 'badge ' + typeToCssClass(type) + ' ' + directionToCssClass(direction);
    const title = isEthereum ? typeToTitle(type) + ' (Ethereum)' : typeToTitle(type)
    return (
        <span className={className}>{title}</span>
    );
};

TransactionBadge.propTypes = {
    type: PropTypes.number.isRequired,
    direction: PropTypes.string
};
