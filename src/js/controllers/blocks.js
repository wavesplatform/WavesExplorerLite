(function () {
    'use strict';

    function BlocksCtrl($http, apiMethods) {
        var ctrl = this;

        ctrl.numPerPage = 20;
        ctrl.currentPage = 1;
        ctrl.pageChanged = changePage;

        activate();

        function activate() {
            $http.get(apiMethods.blocks.height)
                    .success(function (data) {
                        ctrl.height = data.height;
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

            $http.get(apiMethods.blocks.seq(from, to))
                    .success(function (data) {
                        ctrl.blocks = data;
                        ctrl.blocks.reverse();
                        ctrl.blocks.forEach(function (b){
                            b.totalAmount = b.transactions.reduce(function (a, b) {
                                return {amount: a.amount + b.amount};
                            }, {amount:0})
                        });
                    });
        }
    }

    angular.module('web').controller('BlocksCtrl', BlocksCtrl);
})();