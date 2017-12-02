(function () {
    'use strict';

    function BlocksCtrl($http, apiService, cryptoService) {
        var ctrl = this;

        ctrl.numPerPage = 20;
        ctrl.currentPage = 1;
        ctrl.pageChanged = changePage;

        activate();

        function activate() {
            $http.get(apiService.blocks.height).then(function (response) {
                ctrl.height = response.data.height;
                ctrl.totalCount = ctrl.height;
                changePage();
            })
        }

        function changePage() {
            var from = ctrl.height - ctrl.currentPage * ctrl.numPerPage;
            var correction = 0;
            if (from < 0) {
                correction = from - 1;
                from = 1;
            }
            var to = from + ctrl.numPerPage + correction;

            $http.get(apiService.blocks.headers.seq(from, to)).then(function (response) {
                ctrl.blocks = response.data;
                ctrl.blocks.reverse();
            });
        }
    }

    angular.module('web').controller('BlocksCtrl', BlocksCtrl);
})();