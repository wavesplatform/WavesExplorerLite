import React from 'react';
import PropTypes from 'prop-types';

export default class ScriptInfo extends React.PureComponent {
    static propTypes = {
        script: PropTypes.object.isRequired // script, scriptText, address, complexity, extraFee
    };

    render() {
        return (<div>
            <pre>{this.props.script.script}</pre>
        </div>);
    }
}
