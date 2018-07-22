import React from 'react';
import PropTypes from 'prop-types';

export default class NetworkInfo extends React.PureComponent {
    static propTypes = {
        info: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="info-box grid grid-wrap">
            {Object.entries(this.props.info).map(entry => {
                return (<div key={entry[0]} className="column-sm-6">
                    <div className="line"><label>{entry[0]}:</label></div>
                    <div className="line">{entry[1]}</div>
                </div>);
            })}
            </div>
        );
    }
}
