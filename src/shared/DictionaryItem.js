import React from 'react';
import PropTypes from 'prop-types';

export default class DictionaryItem extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.node,
        action: PropTypes.node
    };

    render() {
        return (
            <div className="dictionary-pair">
                <div className="dictionary-pair-key">{this.props.label}</div>
                <div className="dictionary-pair-value">{
                    this.props.action ? <div className="ellipsis">{this.props.value}</div> : this.props.value
                }</div>
                {this.props.action && <div className="dictionary-action">
                    {this.props.action}
                </div>}
            </div>
        );
    }
}
