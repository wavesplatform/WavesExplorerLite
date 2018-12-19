import React from 'react';
import PropTypes from 'prop-types';

export default class ScriptInfo extends React.PureComponent {
    static propTypes = {
        script: PropTypes.object.isRequired // script, scriptText, address, complexity, extraFee
    };

    render() {
        return (<div className="dataContainer empty">
            <div className="empty-icon-wrapper"> {/* TODO @ischenko - add if */}
                <div className="empty-icon"></div>
                <div className="empty-label">No data</div>
            </div>
            <pre>{this.props.script.script}</pre>
        </div>);
    }
}
