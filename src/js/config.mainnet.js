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
        wallet: {
            url: 'https://waveswallet.io',
            title: 'Wallet'
        }
    });

    angular.module('web').constant('constants.network', {
        NETWORK_NAME: 'mainnet', // 'devnet', 'testnet', 'mainnet'
        ADDRESS_VERSION: 1,
        NETWORK_CODE: 'W',
        INITIAL_NONCE: 0
    });
})();