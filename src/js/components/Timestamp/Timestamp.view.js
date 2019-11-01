import React from 'react';
import PropTypes from 'prop-types';

import {TOOLTIP_ID} from '../../shared/constants';
import DateTime from '../../shared/DateTime';

export const TimestampView = ({value}) => {
    if (!value)
        return null;

    const utc = `UTC: ${value.toUtcString()}`;
    return (
        <span data-for={TOOLTIP_ID} data-tip={utc}>{value.toString()}</span>
    );
};

TimestampView.propTypes = {
    value: PropTypes.instanceOf(DateTime)
};

TimestampView.defaultProps = {
    value: undefined
};
