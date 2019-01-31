import React from 'react';
import PropTypes from 'prop-types';

const Pane = props => {
    return props.children;
};

Pane.propTypes = {
    title: PropTypes.string.isRequired
};

export default Pane;
