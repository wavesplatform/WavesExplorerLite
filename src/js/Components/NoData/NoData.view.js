import React from 'react';
import PropTypes from 'prop-types';

export class NoData extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'No data'
    };

    render() {
        const {title} = this.props;

        return (
            <div className="panel panel-empty no-data">
                <div className="panel-empty-icon"></div>
                <div className="line wide panel-empty-label"><label>{title}</label></div>
            </div>
        );
    }
}
