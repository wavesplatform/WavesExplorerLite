const nodeUrl = 'https://apitnetworktest.blackturtle.eu';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: '',
    nodes: [
        {url: nodeUrl, maintainer: 'Turtle Network', showAsLink: true},
    ]
};
