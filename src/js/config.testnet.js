(function () {
    'use strict';

    angular.module('web').constant('appConfig', {
        apiDomain: 'http://52.30.47.67:6869',
        blockchainName: 'Testnet',
        nodes: [
            {url: 'http://52.30.47.67:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.28.66.217:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.77.111.219:6869', maintainer: 'Waves', showAsLink: true},
            {url: 'http://52.51.92.182:6869', maintainer: 'Waves', showAsLink: true}
        ],
        faucetUrl: 'http://52.30.47.67:9000',
        title: 'Waves Testnet Explorer',
        captchaKey: '6Ld58SkTAAAAAHJZg2bR4LWFGRrMlwXZrx2IhO2O'
    });

})();
