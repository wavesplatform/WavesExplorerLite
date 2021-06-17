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
    url: 'https://discord.gg/cnFmDyA'
}, {
    id: 'telegram',
    url: 'https://telegram.me/wavesnews'
}, {
    id: 'reddit',
    url: 'https://reddit.com/r/Wavesplatform/'
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
                <a className="fade" href="https://waves.tech/" target="_blank">waves.tech</a>
            </div>
        </div>
    );
}

export default Footer;
