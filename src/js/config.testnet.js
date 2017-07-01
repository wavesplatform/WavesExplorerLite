(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'http://52.30.47.67:6869',
        title: 'Waves Testnet Explorer',
        blockchainName: 'Testnet',
        nodes: [
            {url: 'http://52.30.47.67:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.28.66.217:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.77.111.219:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.51.92.182:6869', maintainer: 'Waves', showAsLink: true}
        ],
        faucet: {
            url: 'http://52.30.47.67:9000',
            captchaKey: '6Ld58SkTAAAAAHJZg2bR4LWFGRrMlwXZrx2IhO2O'
        },
        peerExplorer: {
            url: 'https://wavesexplorer.com',
            title: 'MAINNET Explorer'
        },
        wallet: {
            url: 'https://testnet.waveswallet.io',
            title: 'Wallet'
        }
    });

})();
