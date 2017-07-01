(function() {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'https://nodes.wavesnodes.com',
        blockchainName: 'Mainnet',
        title: 'Waves Explorer',
        nodes: [{
            url: 'https://nodes.wavesnodes.com',
            maintainer: 'Waves'
        }],
        peerExplorer: {
            url: 'https://testnet.wavesexplorer.com',
            title: 'TESTNET Explorer'
        },
        walletUrl: 'https://waveswallet.io'
    });
})();