(function () {
    'use strict';

    angular
        .module('web')
        .controller('NavigationCtrl', ['$scope', 'appConfig', function ($scope, config) {
            var nav = this;

            var menuItems = [];
            menuItems.push({
                url: 'blocks',
                title: 'Blocks',
                icon: 'glyphicon glyphicon-th-list'
            });
            menuItems.push({
                url: 'peers',
                title: 'Peers',
                icon: 'glyphicon glyphicon-transfer'
            });
            if (config.faucet) {
                menuItems.push({
                    url: 'faucet',
                    title: 'Faucet',
                    icon: 'glyphicon glyphicon-filter'
                });
            }
            menuItems.push({
                url: 'nodes',
                title: 'Nodes',
                icon: 'glyphicon glyphicon-tasks'
            });
            nav.menuItems = menuItems;

            nav.wallet = config.wallet;
            nav.peerExplorer = config.peerExplorer;
        }]);
})();
