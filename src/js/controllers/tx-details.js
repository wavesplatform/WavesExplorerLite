(function() {
    'use strict';

    function TxDetailsCtrl($http, $stateParams, apiService) {
        var ctrl = this;
        ctrl.id = $stateParams.id;

        activate();

        function activate() {
            $http.get(apiService.transactions.info(ctrl.id)).then(function (response) {
                ctrl.details = response.data;

                console.log(response.data);

                if (tx.feeAsset) {
                    $http.get(apiService.transactions.info(tx.feeAsset)).then(function (response) {
                        ctrl.details.assetDecimals = response.data.decimals;
                    })
                } else {
                    ctrl.details.assetDecimals = 8;
                    ctrl.details.feeAsset = "WAVES"
                }
            });
        }
    }

    angular.module('web').controller('TxDetailsCtrl', TxDetailsCtrl);
})();
