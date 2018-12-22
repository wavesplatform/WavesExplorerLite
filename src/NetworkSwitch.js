import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import ConfigurationForm from './ConfigurationForm';

const Network = ({networkId, displayName, onSwitchNetwork}) => {
    return <div onClick={() => onSwitchNetwork(networkId)}>{displayName}</div>;
};

const extractEditableConfiguration = configuration => (
    (({apiBaseUrl, spamListUrl}) => ({apiBaseUrl, spamListUrl}))(configuration)
);

const NetworkShape = PropTypes.shape({
    networkId: PropTypes.string,
    displayName: PropTypes.string,
    url: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    spamListUrl: PropTypes.string
});

export default class NetworkSwitch extends React.PureComponent {
    static propTypes = {
        current: NetworkShape.isRequired,
        networks: PropTypes.arrayOf(NetworkShape).isRequired,
        custom: NetworkShape,
        onSwitchNetwork: PropTypes.func,
        onUpdateCustomNetwork: PropTypes.func
    };

    static defaultProps = {
        onSwitchNetwork: () => {},
        onUpdateCustomNetwork: () => {}
    };

    state = {
        showNetworks: false,
        showModal: false
    };

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    toggleNetworks = () => {
        this.setState({showNetworks: !this.state.showNetworks});
    };

    switchNetwork = (networkId) => {
        this.setState({showNetworks: false});

        this.props.onSwitchNetwork(networkId);
    };

    render() {
        const {current, networks} = this.props;
        const listClassName = 'network-list' + (this.state.showNetworks ? ' expanded' : '');

        const custom = this.props.custom || {
            apiBaseUrl: '',
            spamListUrl: ''
        };
        const configuration = extractEditableConfiguration(custom);

        return (
            <div>
                <div className="network-switcher">
                    <div className="current-network">
                        <i className="network-icon-active"></i>
                        <span className={listClassName} onClick={this.toggleNetworks}>{current.displayName}</span>
                        <div className="network-list-expanded">
                            {networks
                                .filter(item => item.networkId !== current.networkId)
                                .map((item, index) => {
                                    return <Network key={index} {...item} onSwitchNetwork={this.switchNetwork} />
                                })
                            }
                        </div>
                    </div>
                    <div className="settings-button" onClick={this.toggleModal}></div>
                </div>
                <Modal className="modal-content"
                    isOpen={this.state.showModal}
                    onRequestClose={this.toggleModal}
                    contentLabel="Modal example"
                    overlayClassName="modal-overlay"
                >
                    <ConfigurationForm
                        onClose={this.toggleModal}
                        title="Custom"
                        onSubmit={this.props.onUpdateCustomNetwork}
                        values={configuration}
                    />
                </Modal>
            </div>
        );
    }
}
