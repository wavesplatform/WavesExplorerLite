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
        ],
    gateways: [
        // Team gateways
        {name: '$TN',url: 'https://gateway.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$LTC',url: 'https://litecoingw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$BTC',url: 'https://bitcoingw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$WAVES',url: 'https://wavesgateway.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$DASH',url: 'https://dashgw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$WGR',url: 'https://wagerrgw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$SYS',url: 'https://syscoingw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$BCH',url: 'https://bchgw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$DOGE',url: 'https://dogegw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: '$ETH',url: 'https://ethgw.blackturtle.eu/',maintainer: 'https://turtlenetwork.eu'},
        //Partner gateways
        {name: '$TUSD', url: 'https://www.rcanelabs.com/gateways', maintainer:'https://www.rcanelabs.com'}

    ],
    tools: [
        {name: 'Online Wallet & DEX', url: 'https://client.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Chrome Store', url: 'https://chrome.google.com/webstore/detail/turtleshell/billhkeiifjfbbkmmfpcpchikbajnfje?hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell tool', url: 'https://turtleshell.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Android Wallet', url: 'https://play.google.com/store/apps/details?id=com.tn.wallet&hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Statistics', url: 'http://statistics.turtlenetwork.eu/'}

    ]
};
