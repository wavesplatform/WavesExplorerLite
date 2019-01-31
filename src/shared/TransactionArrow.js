import React from 'react';
import PropTypes from 'prop-types';

import {typeToCssClass, TransactionDirections} from '../shared/TransactionDefinitions';

const TransactionArrow = ({type, direction}) => {
    let className = 'arrow ' + typeToCssClass(type);
    if (direction) {
        className += ' ' + directionToArrowClass(direction);
    }

    return <div className={className}></div>
};

TransactionArrow.propTypes = {
    type: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([TransactionDirections.INCOMING, TransactionDirections.OUTGOING])
};

const directionToArrowClass = direction => {
    switch (direction) {
        case TransactionDirections.INCOMING:
            return 'in';

        case TransactionDirections.OUTGOING:
            return 'out';

        default:
            return '';
    }
};

export default TransactionArrow;
