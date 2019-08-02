const nodeUrl = 'https://nodes-stagenet.wavesnodes.com';

export default {
    networkId: 'stagenet',
    displayName: 'Stagenet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://api-stagenet.wavesplatform.com/v0',
    nodes: [{url: nodeUrl, maintainer: 'Waves', showAsLink: true}]
};
