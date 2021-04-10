const nodeUrl = 'https://cluster.tnnode.turtlenetwork.eu';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://data-service.turtlenetwork.eu/v0',
    dataFeedBaseUrl: 'https://api.marketdata.turtlenetwork.eu',
    spamListUrl: 'https://raw.githubusercontent.com/BlackTurtle123/TN-community/master/scam-v2.csv',
    nodes: [
        {url: 'https://tnnode.turtlenetwork.eu',maintainer: 'https://t.me/TurtleNetwork'},
        {url: 'https://tnnode2.turtlenetwork.eu',maintainer: 'https://t.me/TurtleNetwork'},
        {url: 'https://tnnode3.turtlenetwork.eu',maintainer: 'https://t.me/TurtleNetwork'},
        {url: 'https://ninjastar.ninjaturtle.co.za',maintainer: 'https://twitter.com/gordobsa'},
        {url: 'https://node.maplenode.net',maintainer: 'MapleNode'},
        {url: 'https://giznode.thegremlins.net',maintainer: 'G1zm0'},
        {url: 'https://node.mortysnode.nl', maintainer: 'Morty'}
        //{url: 'https://www.globalmarketsource.com',maintainer: '@FriGo_Bar'}
        ],
    tools: [
        {name: 'Online Wallet & DEX', url: 'https://wallet.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Chrome Store', url: 'https://chrome.google.com/webstore/detail/turtleshell/billhkeiifjfbbkmmfpcpchikbajnfje?hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Firefox', url: 'https://addons.mozilla.org/en-US/firefox/addon/turtleshell/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell tool', url: 'https://turtleshell.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Android Wallet', url: 'https://play.google.com/store/apps/details?id=com.tn.wallet&hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Statistics', url: 'http://statistics.turtlenetwork.eu/'}

    ]

};
