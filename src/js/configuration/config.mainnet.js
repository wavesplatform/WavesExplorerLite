const nodeUrl = 'https://tnnode2.turtlenetwork.eu';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://marketdata.turtlenetwork.eu',
    spamListUrl: 'https://raw.githubusercontent.com/BlackTurtle123/TN-community/master/scam-v2.csv',
    nodes: [
        {url: 'https://privatenode.blackturtle.eu',maintainer: 'https://t.me/blackturtle'},
        {url: nodeUrl,maintainer: 'https://t.me/blackturtle'},
        {url: 'https://ninjastar.ninjaturtle.co.za',maintainer: 'https://twitter.com/gordobsa'},
        {url: 'https://node.maplenode.net',maintainer: 'MapleNode'},
        {url: 'https://node2.maplenode.net',maintainer: 'MapleNode'},
        {url: 'https://node3.maplenode.net',maintainer: 'MapleNode'},
        {url: 'https://giznode.thegremlins.net',maintainer: 'G1zm0'},
        {url: 'https://turtlenodeapi.sunchaser.eu',maintainer: 'Sunchaser'},
       // {url: 'https://mncomm.turtlenodes.club',maintainer: 'Maplenode'},
        {url: 'https://www.globalmarketsource.com',maintainer: '@FriGo_Bar'}
        ]
};
