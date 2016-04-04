(function(){
    'use strict';

    const URL = 'http://23.94.190.226:9081';

    angular.module('web').constant('apiMethods', {
        version: URL + '/scorex/version',
        status: URL + '/scorex/status',
        blocks: {
            height: URL + '/blocks/height',
            seq: function(from, to) { return URL + '/blocks/seq/'+from+'/'+to;},
            byHeight: function(height) { return URL + '/blocks/at/'+height;}
        },
        transactions: {
            unconfirmed: URL + '/transactions/unconfirmed',
            forAddress: function(address) { return URL+'/transactions/address/'+address+'/limit/50';}

        }

    });
})();