(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'https://nodes.wavesnodes.com',
        blockchainName: 'Testnet',
        nodes: [
<<<<<<< HEAD
            {url: 'https://nodes.wavesnodes.com', maintainer: 'Waves'}
        ]
=======
            {url: 'http://52.30.47.67:6869', maintainer: 'Waves'},
            {url: 'http://52.28.66.217:6869', maintainer: 'Waves'},
            {url: 'http://52.77.111.219:6869', maintainer: 'Waves'},
            {url: 'http://52.51.92.182:6869', maintainer: 'Waves'},
            {url: 'http://79.140.41.223:6869', maintainer: 'Community'}
        ],
        faucetUrl: 'http://52.30.47.67:9000'
>>>>>>> devel
    });

})();
