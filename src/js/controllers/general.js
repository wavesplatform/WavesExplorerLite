(function () {
    'use strict';

    function GeneralCtrl($http, apiService) {
        var ctrl = this;
        ctrl.consensus = {};
        ctrl.consensus.algo = 'waves';

        activate();

        function activate() {
            $http.get(apiService.version).then(function (data) {
                ctrl.version = data.version;
            });

            $http.get(apiService.status).then(function (data) {
                ctrl.status = data;
            });

            $http.get(apiService.blocks.height).then(function (data) {
                var to = data.height;
                var from = to - 20;
                if (from < 0)
                    from = 1;
                $http.get(apiService.blocks.seq(from, to)).then(function (data) {
                    ctrl.lastBlocks = data;
                    ctrl.lastBlocks.reverse();
                });
                // get avg delay between blocks
                var height = data.height;
                $http.get(apiService.blocks.last).then(function (data) {
                    $http.get(apiService.blocks.delay(data.signature, height - 2)).then(function (data) {
                        ctrl.avgBlockDelay = parseInt(data.delay) / 1000.0 / 60.0;
                    });
                });
            });

            $http.get(apiService.transactions.unconfirmed).then(function (data) {
                ctrl.unconfirmedTxs = data;
            });
            $http.get(apiService.consensus.basetarget).then(function (data) {
                ctrl.consensus.baseTarget = data.baseTarget;
            });
        }
    }

    angular.module('web').controller('GeneralCtrl', GeneralCtrl);
})();
