import React from 'react';
import PropTypes from 'prop-types';

const Description = ({text}) => {
    return <span className="bold">{text}</span>;
};

Description.propTypes = {
    text: PropTypes.string
};

Description.defaultProps = {
    text: ''
};

export default Description;
