import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const Network = ({title, url, onSwitchNetwork}) => {
    return <div onClick={() => onSwitchNetwork(url)}>{title}</div>;
};

const ExplorerShape = PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
});

export default class NetworkSwitch extends React.PureComponent {
    static propTypes = {
        current: ExplorerShape.isRequired,
        peers: PropTypes.arrayOf(ExplorerShape),
        onSwitchNetwork: PropTypes.func
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
                    <div className="header">
                        Settings
                        <div className="close-btn" onClick={this.toggleModal}></div>
                    </div>

                    <div className="row">
                        <label>Blockchain Network</label>
                        <div className="current-network">
                            <i className="network-icon-active"></i>
                            <span>{current.title}</span>
                        </div>
                    </div>

                    <div className="row">
                        <label>Node address</label>
                        <div className="input-wrapper">
                            <input type="text"/> {/* TODO ischenko | class .invalid */}
                            <button className="copy-btn"></button> {/* TODO ischenko */}
                            {/* <!--div className="input-error">&error text&</div> */}
                        </div>
                    </div>

                    <div className="row">
                        <label>Spam list</label>
                        <div className="input-wrapper">
                            <input type="text" className="invalid"/> {/* TODO ischenko | class .invalid */}
                            <button className="copy-btn"></button> {/* TODO ischenko */}
                            <div className="input-error">&error text&</div>
                        </div>
                    </div>

                    <div className="row buttons-wrapper">
                        <button className="interface grey" disabled>Set Default</button> {/* TODO ischenko | add attr='disabled' if by default = true  */}
                        <button className="interface blue" disabled>Save and apply</button> {/* TODO ischenko | add attr='disabled' if wasChanged = false */}
                    </div>
                </Modal>
            </div>
        );
    }
}
