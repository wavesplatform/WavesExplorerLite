import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import ConfigurationForm from './ConfigurationForm';

const Network = ({title, url, onSwitchNetwork}) => {
    return <div onClick={() => onSwitchNetwork(url)}>{title}</div>;
};

const ExplorerShape = PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
});

const valuesShape = PropTypes.shape({
    apiBaseUrl: PropTypes.string,
    spamListUrl: PropTypes.string
});

export default class NetworkSwitch extends React.PureComponent {
    static propTypes = {
        current: ExplorerShape.isRequired,
        peers: PropTypes.arrayOf(ExplorerShape),
        onSwitchNetwork: PropTypes.func,
        onUpdateConfiguration: PropTypes.func,
        configuration: PropTypes.shape({
            currentValues: valuesShape,
            defaultValues: valuesShape
        }).isRequired
    };

    static defaultProps = {
        peers: [],
        onSwitchNetwork: () => {}
    };

    state = {
        showPeers: false,
        showModal: false
    };

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    togglePeers = () => {
        this.setState({showPeers: !this.state.showPeers});
    };

    switchNetwork = (url) => {
        this.setState({showPeers: false});

        this.props.onSwitchNetwork(url);
    };

    render() {
        const {current, peers} = this.props;

        const listClassName = 'network-list' + (this.state.showPeers ? ' expanded' : '');

        return (
            <div>
                <div className="network-switcher">
                    <div className="current-network">
                        <i className="network-icon-active"></i>
                        <span className={listClassName} onClick={this.togglePeers}>{current.title}</span>
                        <div className="network-list-expanded">
                            {peers.map((item, index) => {
                                return <Network key={index} {...item} onSwitchNetwork={this.switchNetwork} />
                            })}
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
                        title={current.title}
                        onSubmit={this.props.onUpdateConfiguration}
                        {...this.props.configuration}
                    />
                </Modal>
            </div>
        );
    }
}
