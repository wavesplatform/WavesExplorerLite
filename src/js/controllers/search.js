(function () {
    'use strict';

    var GROWL_CONFIG = {
        ttl: 2000,
        disableCountDown: true
    };

    function SearchCtrl($scope, $state, $http, apiService, growl) {

        $scope.search = search;

        function tryGetTx(id) {
            $http.get(apiService.transactions.info(id)).then(function (response) {
                if (!response.data.error)
                    $state.go('tx-details', {
                        id: id
                    });
            }).catch(function () {
                growl.info('Nothing has been found for query \'' + id + '\'', GROWL_CONFIG);
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
            .catch(function () {
                growl.error('Failed to make request.<br/> Check your internet connection', GROWL_CONFIG);
            });
        }
    }

    angular.module('web').controller('SearchCtrl', SearchCtrl);
})();
