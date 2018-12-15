import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const Network = ({title, url, current}) => {
    return current ? (<div className="current">{title}</div>) : (<div><a href={url} target="_blank">{title}</a></div>);
};

const ExplorerShape = PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
});

export default class NetworkSwitch extends React.PureComponent {
    static propTypes = {
        current: ExplorerShape.isRequired,
        peer: ExplorerShape.isRequired
    };

    state = {
        showModal: false
    };

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    render() {
        const {current, peer} = this.props;

        return (
            <div>
                <div className="network-switcher">
                    <div className="current-network">
                        <i className="network-icon-active"></i>
                        <span className="network-list">Mainnet</span> {/* TODO ischenko | add class .expanded onClick, show current network */}
                        <div className="network-list-expanded">
                            <div>Testnet</div>
                            <div>Custom</div>
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
                            <span>Mainnet</span>
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
