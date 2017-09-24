(function () {
    'use strict';

    function SearchCtrl($scope, $state, $http, apiService) {

        $scope.search = search;

        function tryGetTx(id) {
            $http.get(apiService.transactions.info(id)).then(function (response) {
                if (!response.data.error)
                    $state.go('tx-details', {
                        id: id
                    });
            })
        }

        function search() {
            var q = $scope.searchQuery;
            if (!q) return;
            // check address
            q = q.trim();
            var addr = q;
            $http.get(apiService.address.validate(addr)).then(function (response) {
                if (response.data.valid)
                    $state.go('address-details', {
                        address: addr
                    });
                else {
                    // check block
                    $http.get(apiService.blocks.bySignature(q)).then(function (response) {
                        if (!response.data.error) {
                            $state.go('block-details-sig', {
                                signature: q
                            })
                        } else {
                            // check tx
                            tryGetTx(q);
                        }
                    })
                    .catch(function () {
                        tryGetTx(q);
                    });
                }
            })
            .catch(function (response) { });
        }
    }

    angular.module('web').controller('SearchCtrl', SearchCtrl);
})();
