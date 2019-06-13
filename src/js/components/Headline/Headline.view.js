import React from 'react';
import PropTypes from 'prop-types';

import CopyButton from '../CopyButton';

export const HeadlineSize = {
    Large: 'large',
    Medium: 'medium',
    Small: 'small'
};

export const Headline = (props) => {
    const titleClassName = 'title ' + props.size;
    return (
        <div className="headline">
            <span className={titleClassName}>{props.title}</span>
            {props.subtitle && <span className="title-details"> / {props.subtitle}</span>}
            {props.copyVisible && <CopyButton text={props.subtitle} />}
        </div>
    );
};

Headline.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.oneOf([HeadlineSize.Large, HeadlineSize.Medium, HeadlineSize.Small]),
    subtitle: PropTypes.string,
    copyVisible: PropTypes.bool
};

Headline.defaultProps = {
    copyVisible: true,
    size: HeadlineSize.Large
};
