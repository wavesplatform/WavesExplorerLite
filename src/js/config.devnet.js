(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'http://34.251.200.245:6869',
        title: 'Waves Devnet Explorer',
        blockchainName: 'Devnet',
        nodes: [
            {url: 'http://34.251.200.245:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://35.157.212.173:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://13.229.61.140:6869', maintainer: 'Waves', showAsLink: true}
        ],
        peerExplorer: {
            url: 'http://devnet.wavesexplorer.com',
            title: 'Devnet Explorer'
        },
        wallet: {
            url: 'http://testnet.waveswallet.io',
            title: 'Wallet'
        }
    });

})();
