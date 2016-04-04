(function(){
    'use strict';

    function BlocksDetailsCtrl($http, apiMethods, $stateParams) {
        var ctrl = this;
        ctrl.id = $stateParams.id;

        activate();

        function activate() {

            $http.get(apiMethods.blocks.byHeight(ctrl.id))
                .success(function(data) {
                    ctrl.details = data;
                })
        }

    }

    angular.module('web').controller('BlocksDetailsCtrl', BlocksDetailsCtrl);
})();
