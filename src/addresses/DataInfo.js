import React from 'react';
import PropTypes from 'prop-types';

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
        return <pre>{JSON.stringify(this.props.data)}</pre>;
    }
}
