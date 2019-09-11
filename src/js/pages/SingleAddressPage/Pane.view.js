import React from 'react';
import PropTypes from 'prop-types';

export const Pane = () => {
    return null;
};

Pane.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
};
