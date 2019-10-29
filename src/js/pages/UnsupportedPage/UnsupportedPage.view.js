import React from 'react';
import Modal from 'react-modal';

import Icon from '../../../images/unsupported-80.svg';
import Firefox from '../../../images/firefox-42.svg';
import Safari from '../../../images/safari-42.svg';
import Opera from '../../../images/opera-42.svg';
import Chrome from '../../../images/chrome-42.svg';

const Browser = ({icon, name, className}) => (
    <div className={`grid-item-fixed ${className}`}>
        <div className="line wide no-wrap">
            <div className="browser-icon">
                <img src={icon} height={42} width={42}/>
            </div>
            <div className="line bold">{name}</div>
            <div className="line btn btn-link">Install or update</div>
        </div>
    </div>
);

const BROWSERS = [{
    icon: Chrome,
    name: 'Chrome',
    className: 'column-8'
}, {
    icon: Firefox,
    name: 'Firefox',
    className: 'column-4'
}, {
    icon: Safari,
    name: 'Safari',
    className: 'column-8'
}, {
    icon: Opera,
    name: 'Opera',
    className: 'column-4'
}];

export const UnsupportedPageView = () => (
    <Modal className="modal-content"
           isOpen={true}
           contentLabel="Modal example"
           overlayClassName="modal-overlay"
    >
        <div className="header">
            &nbsp;
            <div className="close-btn"></div>
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
                {BROWSERS.map(browser => (
                    <Browser key={browser.name} {...browser} />
                ))}
            </div>
        </div>
    </Modal>
);
