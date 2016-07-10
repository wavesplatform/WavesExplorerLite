(function () {
    'use strict';

    function SearchCtrl($scope, $state, $http, apiService) {

        $scope.search = search;

        function search() {
            var q = $scope.searchQuery;
            if (!q)
                return;
            // check address
            var addr = q.substring(2);
            $http.get(apiService.address.validate(addr))
                .success(function (data) {
                    if (data.valid)
                        $state.go('address-details', {address: addr});
                    else {
                        // check block
                        $http.get(apiService.blocks.bySignature(q))
                            .success(function (data) {
                                if (!data.error) {
                                    $state.go('block-details-sig', {signature: q})
                                } else {
                                    // check tx
                                    $http.get(apiService.transactions.info(q))
                                        .success(function (data) {
                                            if (!data.error)
                                                $state.go('tx-details', {signature: q});
                                        })
                                }
                            });
                    }
                })
                .error(function (data) {
                });

        }
    }

    angular.module('web').controller('SearchCtrl', SearchCtrl);
})();

