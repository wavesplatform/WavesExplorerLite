const nodeUrl = 'https://nodes.wavesnodes.com';

export default {
    networkId: 'mainnet',
    displayName: 'Mainnet',
    apiBaseUrl: nodeUrl,
    dataServicesBaseUrl: 'https://api.wavesplatform.com/v0',
    spamListUrl: 'https://raw.githubusercontent.com/wavesplatform/waves-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv',
    decompileScriptUrl: 'https://testnode1.wavesnodes.com/utils/script/decompile',
    nodes: [{url: nodeUrl, maintainer: 'Waves'}]
};
