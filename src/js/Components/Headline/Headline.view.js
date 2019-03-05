import React from 'react';
import PropTypes from 'prop-types';

import CopyButton from '../CopyButton';

export const Headline = (props) => {
    return (
        <div className="headline">
            <span className="title">{props.title}</span>
            {props.subtitle && <span className="title-details"> / {props.subtitle}</span>}
            {props.copyVisible && <CopyButton text={props.subtitle} />}
        </div>
    );
};

Headline.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    copyVisible: PropTypes.bool
};

Headline.defaultProps = {
    copyVisible: true
};
