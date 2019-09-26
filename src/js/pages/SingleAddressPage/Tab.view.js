import React from 'react';
import PropTypes from 'prop-types';

export const Tab = () => {
    return null;
};

Tab.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
};
