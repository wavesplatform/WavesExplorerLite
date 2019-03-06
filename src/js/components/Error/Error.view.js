import React from 'react';
import PropTypes from 'prop-types';

export class Error extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'Unexpected failure'
    };

    render() {
        const {title} = this.props;

        return (
            <div className="panel panel-empty error">
                <div className="panel-empty-icon"></div>
                <div className="line wide panel-empty-label"><label>{title}</label></div>
            </div>
        );
    }
}
