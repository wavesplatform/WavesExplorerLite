(function() {
    'use strict';

    function TxDetailsCtrl($http, $stateParams, apiService) {
        var ctrl = this;
        ctrl.signature = $stateParams.signature;

        activate();

        function activate() {
            $http.get(apiService.transactions.info(ctrl.signature))
                .success(function(data) {
                    ctrl.details = data;
                });
        }
    }

    angular.module('web').controller('TxDetailsCtrl', TxDetailsCtrl);
})();
