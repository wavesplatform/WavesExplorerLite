import React from 'react';
import PropTypes from 'prop-types';

export default class ScriptInfo extends React.PureComponent {
    static propTypes = {
        script: PropTypes.string.isRequired
    };

    render() {
        return (<div>
            <pre>{this.props.script}</pre>
        </div>);
    }
}
