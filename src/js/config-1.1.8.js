(function() {
    'use strict';

    angular.module('web').constant('appConfig', {
        //apiDomain: 'https://waves.guarda.co',
        //apiDomain: 'http://127.0.0.1:6869',	//local node
        apiDomain: location.protocol+'//'+location.hostname+':6869',		//node on the current host with current protocol
        
		dataServiceBaseUrl: 'https://api.wavesplatform.com/v0',
        blockchainName: 'Mainnet',
        title: 'Waves Explorer',
        nodes: [{
            //url: 'https://waves.guarda.co',
            //url: 'http://127.0.0.1:6869',	//local node
            url: location.protocol+'//'+location.hostname+':6869',			//node on the current host with current protocol
            
			maintainer: 'Waves'
        }],
        peerExplorer: {
            url: 'https://testnet.wavesexplorer.com',
            title: 'TESTNET Explorer'
        },
        wallet: {
            url: 'https://beta.wavesplatform.com',
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