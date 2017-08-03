(function () {
    'use strict';

    function AliasDetailsCtrl($http, $state, apiService, $stateParams) {
        var ctrl = this;

        ctrl.alias = $stateParams.alias;
        ctrl.message = 'Resolving...';

        activate();

        function activate() {
            $http.get(apiService.aliases.getAddress(ctrl.alias))
                .success(function (data) {
                    console.log(data);

                    $state.go('address-details', {
                        address: data.address
                    });
                })
                .error(function (message, code) {
                    if (message.error && message.message)
                        ctrl.message = 'Failed to resolve alias. Code (' + message.error + '): ' + message.message;
                    else
                        ctrl.message = 'Failed to make request. Http status: ' + code + '; Message: ' + message;
                });
        }
    }

    angular.module('web').controller('AliasDetailsCtrl', AliasDetailsCtrl);
})();
