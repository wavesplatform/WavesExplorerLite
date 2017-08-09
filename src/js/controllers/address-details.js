(function () {
    'use strict';

    function AddressDetailsCtrl($http, apiService, aliasService, $stateParams) {
        var ctrl = this;
        ctrl.address = $stateParams.address;
        ctrl.aliases = [];

        activate();

        function activate() {
            $http.get(apiService.transactions.forAddress(ctrl.address))
                .success(function (data) {
                    data[0].reverse();
                    ctrl.txs = data[0];
                    ctrl.txs.forEach(function(item) {
                        item.outgoing = (item.sender === ctrl.address);
                    });
                });
            $http.get(apiService.address.balanceDetails(ctrl.address))
                .success(function (data) {
                    ctrl.balance = data;
                });
            $http.get(apiService.aliases.forAddress(ctrl.address))
                .success(function (data) {
                    ctrl.aliases = data.map(function (alias) {
                        return aliasService.fromString(alias);
                    });
                });
        }
    }

    angular.module('web').controller('AddressDetailsCtrl', AddressDetailsCtrl);
})();
