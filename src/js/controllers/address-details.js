(function () {
    'use strict';

    var NO_TRANSACTIONS_MESSAGE = 'No transactions for this address';
    var NO_ALIASES_MESSAGE = 'No aliases for this address';
    var NO_ASSETS_MESSAGE = 'No assets for this address';
    var LOADING_MESSAGE = 'Loading...';

    function AddressDetailsCtrl($http, apiService, aliasService, $stateParams) {
        var ctrl = this;
        ctrl.address = $stateParams.address;
        ctrl.aliases = [];
        ctrl.txs = [];
        ctrl.assets = [];

        ctrl.txsMessage = LOADING_MESSAGE;
        ctrl.aliasesMessage = LOADING_MESSAGE;
        ctrl.assetsMessage = LOADING_MESSAGE;

        activate();

        function activate() {
            $http.get(apiService.address.balanceDetails(ctrl.address))
                .success(function (data) {
                    ctrl.balance = data;
                });
        }

        this.loadTransactions = function () {
            $http.get(apiService.transactions.forAddress(ctrl.address))
                .success(function (data) {
                    ctrl.txs = data[0];
                    ctrl.txs.forEach(function(item) {
                        item.outgoing = (item.sender === ctrl.address);
                    });
                })
                .error(function () {
                    ctrl.txsMessage = 'Error loading transactions';
                });
        };

        this.loadAssets = function () {
            $http.get(apiService.assets.balance(ctrl.address))
                .success(function (data) {
                    ctrl.assets = data.balances.map(function (assetBalance) {
                        return {
                            id: assetBalance.assetId,
                            balance: assetBalance.balance,
                            name: assetBalance.issueTransaction.name
                        }
                    });
                })
                .error(function () {
                    ctrl.assetsMessage = 'Error loading assets balance';
                });
        };

        this.loadAliases = function () {
            $http.get(apiService.aliases.forAddress(ctrl.address))
                .success(function (data) {
                    ctrl.aliases = data.map(function (alias) {
                        return aliasService.fromString(alias);
                    });
                })
                .error(function () {
                    ctrl.aliasesMessage = 'Error loading aliases';
                });
        };
    }

    angular.module('web').controller('AddressDetailsCtrl', AddressDetailsCtrl);
})();
