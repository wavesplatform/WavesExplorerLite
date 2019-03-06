import React from 'react';
import PropTypes from 'prop-types';

import {typeToCssClass, typeToTitle, directionToCssClass} from '../../shared/TransactionDefinitions';

export const TransactionBadge = ({type, direction}) => {
    const className = 'badge ' + typeToCssClass(type) + ' ' + directionToCssClass(direction);
    return (
        <span className={className}>{typeToTitle(type)}</span>
    );
};

TransactionBadge.propTypes = {
    type: PropTypes.number.isRequired,
    direction: PropTypes.string
};
