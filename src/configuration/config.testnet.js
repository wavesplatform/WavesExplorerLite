const nodeUrl = 'https://testnode1.wavesnodes.com';

export default {
    networkId: 'testnet',
    displayName: 'Testnet',
    apiBaseUrl: nodeUrl,
    nodes: [
        {url: nodeUrl, maintainer: 'Waves', showAsLink: true},
        {url: 'https://testnode2.wavesnodes.com', maintainer: 'Waves', showAsLink: true},
        {url: 'https://testnode3.wavesnodes.com', maintainer: 'Waves', showAsLink: true},
        {url: 'https://testnode4.wavesnodes.com', maintainer: 'Waves', showAsLink: true}
    ],
    faucet: {
        url: 'https://testnode1.wavesnodes.com/faucet',
        captchaKey: '6LdT8pAUAAAAAOhIIJGKA6HAOo7O98gdIoUgznKL',
        address: '3MxyKNmnQkVuDCG9AzMpixKCdUWXfMUsxdg'
    }
};
