(function () {
    'use strict';

    function NodesCtrl($http, apiProvider, appConfig) {
        var ctrl = this;
        ctrl.nodes = appConfig.nodes;

        activate();

        function activate() {
            ctrl.nodes.forEach(function (node) {

                $http.get(apiProvider(node.url).version)
                        .success(function (data) {
                            node.version = data.version;
                        }).error(function () {
                    node.version = "error";
                });

                $http.get(apiProvider(node.url).blocks.height)
                        .success(function (data) {
                            node.height = data.height;
                        }).error(function () {
                    node.height = "error";
                });

                $http.get(apiProvider(node.url).consensus.basetarget)
                        .success(function (data) {
                            node.baseTarget = data.baseTarget;
                        }).error(function () {
                    node.baseTarget = "error";
                });
                $http.get(apiProvider(node.url).debug.info)
                        .success(function (data) {
                            node.debugStateHeight = data.stateHeight;
                            node.debugStateHash = data.stateHash;
                        }).error(function () {
                    node.debugStateHeight = "error";
                    node.debugStateHash = "-";
                });
                $http.get(apiProvider(node.url).transactions.utxSize)
                    .success(function (data) {
                        node.utxSize = data.size;
                    });
            });
        }
    }

    angular.module('web').controller('NodesCtrl', NodesCtrl);
})();
