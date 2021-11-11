import React from 'react';
import PropTypes from 'prop-types';

export const OpenNFTButtonView = ({children, onClick}) => (
    <div className="btn btn-open" onClick={onClick}>{children}</div>
);

OpenNFTButtonView.propTypes = {
    onClick: PropTypes.func
};

OpenNFTButtonView.defaultProps = {
    onClick: () => {}
};
