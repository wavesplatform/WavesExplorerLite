import React from 'react';
import PropTypes from 'prop-types';

import * as Configuration from './configuration';

const Network = ({id, title, current, onChange}) => {
    return current ? (<div className="current">{title}</div>) : (<div onClick={() => onChange(id)}>{title}</div>);
};

export default class NetworkSwitch extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        value: 'mainnet'
    };

    render() {
        return (
            <div>
                <div className="network-switcher">
                    {Configuration.networks.map(id => {
                        const configuration = Configuration.create(id);
                        return <Network
                            key={id}
                            id={id}
                            title={configuration.displayName}
                            current={id === this.props.value}
                            onChange={this.props.onChange}/>;
                    })}
                </div>
            </div>
        );
    }
}
