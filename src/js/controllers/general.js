(function () {
    'use strict';

    function GeneralCtrl($http, apiService) {
        var ctrl = this;
        ctrl.consensus = {};
        ctrl.consensus.algo = 'waves';

        activate();

        function activate() {
            $http.get(apiService.version)
                .success(function (data) {
                    ctrl.version = data.version;
                })

            $http.get(apiService.status)
                .success(function (data) {
                    ctrl.status = data;
                })

            $http.get(apiService.blocks.height)
                .success(function (data) {
                    var to = data.height;
                    var from = to - 20;
                    if (from < 0)
                        from = 1;
                    $http.get(apiService.blocks.seq(from, to))
                        .success(function (data) {
                            ctrl.lastBlocks = data;
                            ctrl.lastBlocks.reverse();
                        });
                    // get avg delay between blocks
                    var height = data.height
                    $http.get(apiService.blocks.last)
                        .success(function (data) {
                            $http.get(apiService.blocks.delay(data.signature, height - 2))
                                .success(function (data) {
                                    ctrl.avgBlockDelay = parseInt(data.delay) / 1000.0 / 60.0;
                                });

                        });
                });

            $http.get(apiService.transactions.unconfirmed)
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
            $http.get(apiService.consensus.basetarget)
                .success(function (data) {
                    ctrl.consensus.baseTarget = data.baseTarget;
                });
        }
    }

    angular.module('web').controller('GeneralCtrl', GeneralCtrl);
})();
