import React from 'react';
import PropTypes from 'prop-types';

import CopyButton from './CopyButton';

const Headline = (props) => {
    return (
        <div className="headline">
            <span className="title">{props.title}</span>
            <span className="title-details"> / {props.subtitle}</span>
            {props.copyVisible && <CopyButton text={props.subtitle} />}
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
