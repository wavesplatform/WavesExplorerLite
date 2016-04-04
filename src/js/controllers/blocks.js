(function(){
    'use strict';

    function BlocksCtrl($http, apiMethods) {
        var ctrl = this;

        ctrl.numPerPage = 19;
        ctrl.currentPage = 1;
        ctrl.pageChanged = changePage;

        activate();

        function activate() {
            $http.get(apiMethods.blocks.height)
                .success(function(data) {
                    ctrl.height = data.height;
                    ctrl.totalCount = ctrl.height;
                    changePage();
                })
        }

        function changePage() {
            var from = ctrl.height - ctrl.currentPage * ctrl.numPerPage;
            var correction = 0;
            if (from < 0) {
                correction = from;
                from = 1;
            }
            var to = from + ctrl.numPerPage + correction;

            $http.get(apiMethods.blocks.seq(from, to))
                .success(function(data){
                    ctrl.blocks = data;
                    var height = from;
                    for (var i = 0; i < ctrl.blocks.length; i++) {
                        ctrl.blocks[i].height = height;
                        height++;
                    }
                    ctrl.blocks.reverse();
                });
        }



    }

    angular.module('web').controller('BlocksCtrl', BlocksCtrl);
})();