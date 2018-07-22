import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/wavesplatform/'
}, {
    id: 'twitter',
    url: 'https://twitter.com/@wavesplatform'
}, {
    id: 'facebook',
    url: 'https://www.facebook.com/wavesplatform/'
}, {
    id: 'discord',
    url: '#'
}, {
    id: 'telegram',
    url: '#'
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version: {version}</div>
            <div>Brought to you by Waves Team</div>
            <div>
                {socialLinks.map(item =>
                    (<a key={item.id} className={`social ${item.id}`} href={item.url} target="_blank"></a>))}
            </div>
            <div>
                <a className="fade" href="https://wavesplatform.com" target="_blank">wavesplatform.com</a>
            </div>
        </div>
    );
}

export default Footer;
