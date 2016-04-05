(function(){
    'use strict';

    function BlocksDetailsCtrl($http, apiMethods, $stateParams) {
        var ctrl = this;
        ctrl.height = $stateParams.height;

        activate();

        function activate() {

            $http.get(apiMethods.blocks.byHeight(ctrl.height))
                .success(function(data) {
                    ctrl.details = data;
                })
        }

    }

    angular.module('web').controller('BlocksDetailsCtrl', BlocksDetailsCtrl);
})();
