import React from 'react';
import PropTypes from 'prop-types';

export const Description = ({text}) => {
    return <span className="bold">{text}</span>;
};

Description.propTypes = {
    text: PropTypes.string
};

Description.defaultProps = {
    text: ''
};
