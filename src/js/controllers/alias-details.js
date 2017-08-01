(function () {
    'use strict';

    function AliasDetailsCtrl($http, apiService, $stateParams) {
        var ctrl = this;
        ctrl.alias = $stateParams.alias;

        //TODO: make API request to resolve alias and redirect to address-details
    }

    angular.module('web').controller('AliasDetailsCtrl', AliasDetailsCtrl);
})();
