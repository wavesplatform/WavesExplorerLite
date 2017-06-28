(function () {
    'use strict';

    function SearchCtrl($scope, $state, $http, apiService) {

        $scope.search = search;

        function tryGetTx(id) {
            $http.get(apiService.transactions.info(id))
                .success(function (data) {
                    if (!data.error)
                        $state.go('tx-details', {
                            signature: id
                        });
                })
        }

        function search() {
            var q = $scope.searchQuery;
            if (!q) return;
            // check address
            var addr = q.substring(2);
            $http.get(apiService.address.validate(addr))
                .success(function (data) {
                    if (data.valid)
                        $state.go('address-details', {
                            address: addr
                        });
                    else {
                        // check block
                        $http.get(apiService.blocks.bySignature(q))
                            .success(function (data) {
                                if (!data.error) {
                                    $state.go('block-details-sig', {
                                        signature: q
                                    })
                                } else {
                                    // check tx
                                    tryGetTx(q);
                                }
                            })
                            .error(function () {
                                tryGetTx(q);
                            });
                    }
                })
                .error(function (data) { });
        }
    }

    angular.module('web').controller('SearchCtrl', SearchCtrl);
})();
