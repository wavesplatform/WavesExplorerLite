import React from 'react';
import PropTypes from 'prop-types';

export class InvocationInfoView extends React.Component {
    static propTypes = {
        function: PropTypes.string.isRequired,
        args: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })).isRequired
    };

    render() {
        return (
            <span>
                <span>{this.props.function}</span>
                ({this.props.args.map((item, index) => value)})
            </span>
        );
    }
}
