const nodeUrl = 'https://apitnetworktest.blackturtle.eu';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: '',
    dataFeedBaseUrl: '',
    nodes: [
        {url: nodeUrl, maintainer: 'Turtle Network', showAsLink: true},
    ],
    gateways: [

    ],
    tools: [
        {name: 'Online Wallet & DEX', url: 'https://www.testclient.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell Chrome Store', url: 'https://chrome.google.com/webstore/detail/turtleshell/billhkeiifjfbbkmmfpcpchikbajnfje?hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'TurtleShell tool', url: 'https://turtleshell.turtlenetwork.eu/',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Android Wallet', url: 'https://play.google.com/store/apps/details?id=com.tn.wallet&hl=nl',maintainer: 'https://turtlenetwork.eu'},
        {name: 'Statistics', url: 'http://statistics.turtlenetwork.eu/testnet/'}

    ],
    tickers: [

    ]
};
