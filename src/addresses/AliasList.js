import React from 'react';
import PropTypes from 'prop-types';

export default class AliasList extends React.Component {
    static propTypes = {
        aliases: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <div></div>
        );
    }
}
