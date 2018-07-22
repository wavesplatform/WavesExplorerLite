import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/wavesplatform/'
}, {
    id: 'twitter',
    url: ''
}, {
    id: 'facebook',
    url: ''
}, {
    id: 'discord',
    url: ''
}, {
    id: 'telegram',
    url: ''
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version: {version}</div>
            <div>Brought to you by Waves Team</div>
            <div>
                {socialLinks.map(item => (<div className={`social ${item.id}`}></div>))}
            </div>
            <div>
                <a className="fade" href="https://wavesplatform.com" target="_blank">wavesplatform.com</a>
            </div>
        </div>
    );
}

export default Footer;
