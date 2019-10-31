import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import Icon from '../../../images/unsupported-80.svg';

const Browser = ({icon, name, link}) => (
    <div className="grid-item-fixed column-6">
        <div className="line wide no-wrap">
            <div className="browser-icon">
                <img src={icon} height={42} width={42}/>
            </div>
            <div className="line bold">{name}</div>
            <div className="line btn btn-link">
                <a href={link} className="no-style" target="_blank">Install or update</a>
            </div>
        </div>
    </div>
);

export const UnsupportedPageView = ({isOpen, browsers, onClose}) => (
    <Modal className="modal-content"
           isOpen={isOpen}
           overlayClassName="modal-overlay"
    >
        <div className="header">
            &nbsp;
            <div className="close-btn" onClick={onClose}></div>
        </div>
        <div className="row">
            <img className="icon" src={Icon} height={80} width={80}/>
        </div>
        <div className="row">
            <div className="title">Your browser is not supported</div>
        </div>
        <div className="row">
            <div className="message">Please update to the latest version of one of the following browsers:</div>
        </div>
        <div className="row">
            <div className="grid grid-wrap browser-list">
                {browsers.map(browser => (
                    <Browser key={browser.name} {...browser} />
                ))}
            </div>
        </div>
    </Modal>
);

UnsupportedPageView.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    browsers: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.node,
        name: PropTypes.string,
        link: PropTypes.string
    })).isRequired
};
