const nodeUrl = 'https://cluster.testnet.tnnode.turtlenetwork.eu';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://testnet.data-service.turtlenetwork.eu/v0',
    dataFeedBaseUrl: '',
    nodes: [
        {url: 'https://testnet.tnnode.turtlenetwork.eu', maintainer: 'https://t.me/TurtleNetwork', showAsLink: true},
        {url: 'https://testnet.tnnode2.turtlenetwork.eu', maintainer: 'https://t.me/TurtleNetwork', showAsLink: true},
        {url: 'https://testnet.tnnode3.turtlenetwork.eu', maintainer: 'https://t.me/TurtleNetwork', showAsLink: true},
    ],
    gateways: [

    ],
    tools: [
        {name: 'Online Wallet & DEX', url: 'https://testnet.wallet.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Chrome Store', url: 'https://chrome.google.com/webstore/detail/turtleshell/billhkeiifjfbbkmmfpcpchikbajnfje?hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Firefox', url: 'https://addons.mozilla.org/en-US/firefox/addon/turtleshell/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell tool', url: 'https://turtleshell.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Android Wallet', url: 'https://play.google.com/store/apps/details?id=com.tn.wallet&hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Statistics', url: 'http://statistics.turtlenetwork.eu/testnet/'}

    ],
    tickers: [

    ]
};
