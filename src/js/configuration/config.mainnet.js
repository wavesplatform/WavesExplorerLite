const nodeUrl = 'https://privatenode.blackturtle.eu';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://marketdata.turtlenetwork.eu',
    spamListUrl: 'UNDEFINED',
    nodes: [{url: nodeUrl, maintainer: 'Turtle Network'}]
};
