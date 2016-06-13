(function () {
    'use strict';

    function GeneralCtrl($http, apiMethods) {
        var ctrl = this;
        ctrl.consensus = {};
        ctrl.consensus.algo = 'waves';

        activate();

        function activate() {
            $http.get(apiMethods.version)
                    .success(function (data) {
                        ctrl.version = data.version;
                    })

            $http.get(apiMethods.status)
                    .success(function (data) {
                        ctrl.status = data;
                    })

            $http.get(apiMethods.blocks.height)
                    .success(function (data) {
                        var to = data.height;
                        var from = to - 20;
                        if (from < 0)
                            from = 1;
                        $http.get(apiMethods.blocks.seq(from, to))
                                .success(function (data) {
                                    ctrl.lastBlocks = data;
                                    var height = from;
                                    for (var i = 0; i < ctrl.lastBlocks.length; i++) {
                                        ctrl.lastBlocks[i].height = height;
                                        height++;
                                    }
                                    ctrl.lastBlocks.reverse();
                                });
                        // get avg delay between blocks
                        var height = data.height
                        $http.get(apiMethods.blocks.last)
                                .success(function(data) {
                                    $http.get(apiMethods.blocks.delay(data.signature, height-2))
                                            .success(function (data) {
                                                ctrl.avgBlockDelay = parseInt(data.delay) / 1000.0 / 60.0;
                                            });
                                    
                                });
                    });
                    
            $http.get(apiMethods.transactions.unconfirmed)
                    .success(function (data) {
                        ctrl.unconfirmedTxs = data;
                    });
            /* actual for permacoin
             $http.get(apiMethods.consensus.puz)
             .success(function (data) {
             ctrl.consensus.puz = data.puz;
             }); */
            /*$http.get(apiMethods.consensus.algo)
             .success(function (data) {
             ctrl.consensus.algo = data.consensusAlgo;
             });*/
            $http.get(apiMethods.consensus.basetarget)
                    .success(function (data) {
                        ctrl.consensus.baseTarget = data.baseTarget;
                    });
        }
    }

    angular.module('web').controller('GeneralCtrl', GeneralCtrl);
})();
