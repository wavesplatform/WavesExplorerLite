import React from 'react';
import PropTypes from 'prop-types';

import DateTime from '../../shared/DateTime';

export const TimestampView = ({value, withZone}) => {
    if (!value)
        return null;

    return withZone ? value.toStringWithTimeZone() : value.toString();
};

TimestampView.propTypes = {
    value: PropTypes.instanceOf(DateTime),
    withZone: PropTypes.bool
};

TimestampView.defaultProps = {
    value: undefined,
    withZone: false
};
