import React from 'react';
import PropTypes from 'prop-types';

import EmptyData from './EmptyData';

export default class DataInfo extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        })).isRequired
    };

    render() {
        const isEmpty = this.props.data.length == 0;
        const rowClassName = 'dataContainer' + (isEmpty ? ' empty' : '');

        return (
            <div className={rowClassName}>
                {isEmpty ? <EmptyData /> : <pre>{JSON.stringify(this.props.data, null, 2)}</pre>}
            </div>
        );
    }
}
