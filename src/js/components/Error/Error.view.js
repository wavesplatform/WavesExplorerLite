import React from 'react';
import PropTypes from 'prop-types';

export const ERROR_TYPES = {
    GENERIC: 'generic',
    NOT_FOUND: 'not-found'
};

export class Error extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.oneOf(Object.values(ERROR_TYPES))
    };

    static defaultProps = {
        title: 'Unexpected failure',
        type: ERROR_TYPES.GENERIC
    };

    render() {
        const {title, type} = this.props;

        return (
            <div className="panel panel-empty error">
                <div className={`icon ${type}-icon`}></div>
                <div className="line wide panel-empty-label"><label>{title}</label></div>
            </div>
        );
    }
}
