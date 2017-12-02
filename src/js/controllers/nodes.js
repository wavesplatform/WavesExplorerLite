(function () {
    'use strict';

    function NodesCtrl($http, apiProvider, appConfig) {
        var ctrl = this;
        ctrl.nodes = appConfig.nodes;
        ctrl.title = appConfig.blockchainName + ' Nodes';

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

                $http.get(apiProvider(node.url).consensus.basetarget).then(function (response) {
                    node.baseTarget = response.data.baseTarget;
                })
                .catch(function () {
                    node.baseTarget = "error";
                });

                $http.get(apiProvider(node.url).transactions.utxSize).then(function (response) {
                    node.utxSize = response.data.size;
                })
                .catch(function () {
                    node.utxSize = 'N/A'
                });
            });
        }
    }

    angular.module('web').controller('NodesCtrl', NodesCtrl);
})();
