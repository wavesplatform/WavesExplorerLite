const nodeUrl = 'https://nodes-testnet.wavesnodes.com';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    useCustomRequestConfig: true,
    dataServicesBaseUrl: 'https://api.testnet.wavesplatform.com/v0',
    nodes: [
        {url: nodeUrl, maintainer: 'Waves', showAsLink: true}
    ],
    faucet: {
        url: 'https://faucet-testnet.wavesnodes.com/',
        captchaKey: '6LcObcYsAAAAAGumjLIdyO8CeoFvk-8rvACGNEh5',
        address: '3N96dLv45V3CPMmHUGUTCd97DbCsQQ5Lgro'
    }
};
