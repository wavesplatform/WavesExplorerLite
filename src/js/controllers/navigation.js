(function () {
    'use strict';

    angular
        .module('web')
        .controller('NavigationCtrl', ['$scope', 'appConfig', function ($scope, config) {
            var nav = this;

            var menuItems = [];
            menuItems.push({
                url: 'blocks',
                title: 'Blocks'
            });
            menuItems.push({
                url: 'peers',
                title: 'Peers'
            });
            if (config.faucet) {
                menuItems.push({
                    url: 'faucet',
                    title: 'Faucet'
                });
            }
            menuItems.push({
                url: 'nodes',
                title: 'Nodes'
            });
            menuItems.push({
                url: config.walletUrl,
                title: 'Wallet'
            });

            nav.menuItems = menuItems;
            nav.peerExplorer = config.peerExplorer;

            console.log(nav);
        }]);
})();
