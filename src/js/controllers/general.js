(function(){


    function GeneralCtrl($http, apiMethods) {
        var ctrl = this;

        activate();

        function activate() {
            $http.get(apiMethods.version)
                .success(function(data) {
                    ctrl.version = data.version;
                })

            $http.get(apiMethods.status)
                .success(function(data) {
                    ctrl.status = data.status;
                })

            $http.get(apiMethods.blocks.height)
                .success(function(data) {
                    var to = data.height;
                    var from = to - 20;
                    $http.get(apiMethods.blocks.seq(from, to))
                        .success(function(data){
                            ctrl.lastBlocks = data;
                            var height = from;
                            for (var i = 0; i < ctrl.lastBlocks.length; i++) {
                                ctrl.lastBlocks[i].height = height;
                                height++;
                            }
                            ctrl.lastBlocks.reverse();
                        });
                });
            $http.get(apiMethods.transactions.unconfirmed)
                .success(function(data){
                    ctrl.unconfirmedTxs = data[0];
                })

        }
    }

    angular.module('web').controller('GeneralCtrl', GeneralCtrl);
})();