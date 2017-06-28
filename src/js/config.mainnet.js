(function() {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'https://nodes.wavesnodes.com',
        blockchainName: 'Mainnet',
        nodes: [{
            url: 'https://nodes.wavesnodes.com',
            maintainer: 'Waves'
        }],
        faucetUrl: '',
        title: 'Waves Explorer'
    });

})();