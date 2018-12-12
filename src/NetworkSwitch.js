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
                    <Network current={true} {...current} />
                    <Network {...peer} />
                    <div>
                        <button onClick={this.toggleModal}>Settings</button>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.toggleModal}
                    contentLabel="Modal example"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <h2>Header</h2>
                    <button onClick={this.toggleModal}>Close</button>
                </Modal>
            </div>
        );
    }
}
