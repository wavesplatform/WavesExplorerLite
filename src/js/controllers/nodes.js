(function () {
    'use strict';

    function NodesCtrl($http, apiProvider, appConfig) {
        var ctrl = this;
        ctrl.nodes = appConfig.nodes;
        ctrl.blockchainName = appConfig.blockchainName;

        activate();

        function activate() {
            ctrl.nodes.forEach(function (node) {

                $http.get(apiProvider(node.url).version).then(function (response) {
                            node.version = response.data.version;
                })
                .catch(function () {
                    node.version = "error";
                });

                $http.get(apiProvider(node.url).blocks.height).then(function (response) {
                    node.height = response.data.height;
                })
                .catch(function () {
                    node.height = "error";
                });

                $http.get(apiProvider(node.url).consensus.basetarget).then(function (data) {
                    node.baseTarget = data.baseTarget;
                })
                .catch(function () {
                    node.baseTarget = "error";
                });

                $http.get(apiProvider(node.url).debug.info).then(function (data) {
                    node.debugStateHeight = data.stateHeight;
                    node.debugStateHash = data.stateHash;
                })
                .catch(function () {
                    node.debugStateHeight = "error";
                    node.debugStateHash = "-";
                });

                $http.get(apiProvider(node.url).transactions.utxSize).then(function (data) {
                    node.utxSize = data.size;
                });
            });
        }
    }

    angular.module('web').controller('NodesCtrl', NodesCtrl);
})();
