import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/TurtleNetwork/'
}, {
    id: 'twitter',
    url: 'https://twitter.com/TurtleNetworkTN'
}, {
    id: 'facebook',
    url: 'https://www.facebook.com/TurtleNetworkTN/'
}, {
    id: 'discord',
    url: ''
}, {
    id: 'telegram',
    url: 'https://t.me/TurtleNetwork'
}, {
    id: 'reddit',
    url: 'https://www.reddit.com/r/TurtleNetwork/'
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version: {version}</div>
            <div>Brought to you by Turtle Network Team, based on Waves Team</div>
            <div>
                {socialLinks.map(item =>
                    (<a key={item.id} className={`social ${item.id}`} href={item.url} target="_blank"></a>))}
            </div>
            <div>
                <a className="fade" href="https://turtlenetwork.eu" target="_blank">turtlenetwork.eu</a>
            </div>
        </div>
    );
}

export default Footer;
