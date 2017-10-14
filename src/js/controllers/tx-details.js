(function() {
    'use strict';

    function TxDetailsCtrl($http, transactionFormattingService, $stateParams, apiService) {
        var ctrl = this;
        ctrl.id = $stateParams.id;

        activate();

        function activate() {
            $http.get(apiService.transactions.info(ctrl.id)).then(function (response) {
                ctrl.details = response.data;

                return transactionFormattingService.processAmountAndFee([ctrl.details]);
            });
        }
    }

    angular.module('web').controller('TxDetailsCtrl', TxDetailsCtrl);
})();
