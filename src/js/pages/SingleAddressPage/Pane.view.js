import React from 'react';
import PropTypes from 'prop-types';

export const Pane = props => {
    return props.children;
};

Pane.propTypes = {
    title: PropTypes.string.isRequired
};
