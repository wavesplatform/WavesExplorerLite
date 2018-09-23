import React from 'react';
import PropTypes from 'prop-types';

const Headline = (props) => {
    return (
        <div className="headline">
            <span className="title">{props.title}</span>
            <span className="title-details"> / {props.subtitle}</span>
            {props.copyVisible && <span className="btn btn-copy">Copy</span>}
        </div>
    );
};

Headline.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    copyVisible: PropTypes.bool
};

Headline.defaultProps = {
    copyVisible: true
};

export default Headline;
