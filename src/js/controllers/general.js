(function () {
    'use strict';

    function GeneralCtrl($http, apiService) {
        var ctrl = this;
        ctrl.consensus = {};
        ctrl.consensus.algo = 'waves';

        activate();

        function activate() {
            $http.get(apiService.version).then(function (response) {
                ctrl.version = response.data.version;
            });

            $http.get(apiService.status).then(function (response) {
                ctrl.status = response.data;
            });

            $http.get(apiService.blocks.height).then(function (response) {
                var to = response.data.height;
                var from = to - 20;
                if (from < 0)
                    from = 1;
                $http.get(apiService.blocks.seq(from, to)).then(function (response) {
                    ctrl.lastBlocks = response.data;
                    ctrl.lastBlocks.reverse();
                });
                // get avg delay between blocks
                var height = response.data.height;
                $http.get(apiService.blocks.last).then(function (response) {
                    $http.get(apiService.blocks.delay(response.data.signature, height - 2)).then(function (response) {
                        ctrl.avgBlockDelay = parseInt(response.data.delay) / 1000.0 / 60.0;
                    });
                });
            });

            $http.get(apiService.transactions.unconfirmed).then(function (response) {
                ctrl.unconfirmedTxs = response.data;
            });
            $http.get(apiService.consensus.basetarget).then(function (response) {
                ctrl.consensus.baseTarget = response.data.baseTarget;
            });
        }
    }

    angular.module('web').controller('GeneralCtrl', GeneralCtrl);
})();
