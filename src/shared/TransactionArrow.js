import React from 'react';
import PropTypes from 'prop-types';

import {typeToCssClass} from '../shared/TransactionTypes';

const INCOMING = 'incoming';
const OUTGOING = 'outgoing';

const TransactionArrow = ({type, direction}) => {
    let className = 'arrow ' + typeToCssClass(type);
    if (direction) {
        className += ' ' + directionToArrowClass(direction);
    }

    return <div className={className}></div>
};

TransactionArrow.propTypes = {
    type: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([INCOMING, OUTGOING])
};

const directionToArrowClass = direction => {
    switch (direction) {
        case INCOMING:
            return 'in';

        case OUTGOING:
            return 'out';

        default:
            return '';
    }
};

export default TransactionArrow;
