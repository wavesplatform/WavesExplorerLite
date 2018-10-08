import React from 'react';
import PropTypes from 'prop-types';

const networks = [{
    id: 'mainnet',
    title: 'Mainnet'
}, {
    id: 'testnet',
    title: 'Testnet'
}];

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
                    {networks.map(item =>
                        (<Network
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            current={item.id === this.props.value}
                            onChange={this.props.onChange} />)
                    )}
                </div>
            </div>
        );
    }
}
