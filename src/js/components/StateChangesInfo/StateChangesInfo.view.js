import React from 'react';
import PropTypes from 'prop-types';

export const StateChangesInfoView = ({changes}) => (
    <div className="data-container">
        <pre>{changes}</pre>
    </div>
);

StateChangesInfoView.propTypes = {
    changes: PropTypes.string.isRequired
};
