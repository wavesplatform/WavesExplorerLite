const nodeUrl = 'https://nodes.wavesnodes.com';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://mainnet-htz-hel1-1.wavesnodes.com/',
    spamListUrl: 'https://raw.githubusercontent.com/wavesplatform/waves-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv',
    nodes: [{url: nodeUrl, maintainer: 'Waves'}]
};
