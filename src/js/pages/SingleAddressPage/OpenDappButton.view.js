import React from 'react';
import PropTypes from 'prop-types';

export const OpenDappButtonView = ({children, onClick}) => (
    <div className="btn btn-open" onClick={onClick}>{children}</div>
);

OpenDappButtonView.propTypes = {
    onClick: PropTypes.func
};

OpenDappButtonView.defaultProps = {
    onClick: () => {}
};
