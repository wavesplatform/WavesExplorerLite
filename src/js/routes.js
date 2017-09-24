(function () {
    'use strict';

    angular.module('web')
        .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
            $stateProvider
                .state('general', {
                    url: '/',
                    views: {
                        "main": {
                            controller: 'GeneralCtrl as ctrl',
                            templateUrl: '/templates/general.html'
                        }
                    }
                })
                .state('address-details', {
                    url: '/address/:address',
                    views: {
                        "main": {
                            controller: 'AddressDetailsCtrl as ctrl',
                            templateUrl: '/templates/address-details.html'
                        }
                    }
                })
                .state('alias-details', {
                    url: '/alias/:alias',
                    views: {
                        "main": {
                            controller: 'AliasDetailsCtrl as ctrl',
                            templateUrl: '/templates/alias-details.html'
                        }
                    }
                })
                .state('blocks', {
                    url: '/blocks',
                    views: {
                        "main": {
                            controller: 'BlocksCtrl as ctrl',
                            templateUrl: '/templates/blocks.html'
                        }
                    }
                })
                .state('block-details-sig', {
                    url: '/blocks/s/:signature',
                    views: {
                        "main": {
                            controller: 'BlocksDetailsSigCtrl as ctrl',
                            templateUrl: '/templates/block-details.html'
                        }
                    }
                })
                .state('block-details', {
                    url: '/blocks/:height',
                    views: {
                        "main": {
                            controller: 'BlocksDetailsCtrl as ctrl',
                            templateUrl: '/templates/block-details.html'
                        }
                    }
                })
                .state('tx-details', {
                    url: '/tx/:id',
                    views: {
                        "main": {
                            controller: 'TxDetailsCtrl as ctrl',
                            templateUrl: '/templates/tx-details.html'
                        }
                    }
                })
                .state('peers', {
                    url: '/peers',
                    views: {
                        "main": {
                            controller: 'PeersCtrl as ctrl',
                            templateUrl: '/templates/peers.html'
                        }
                    }
                })
                .state('faucet', {
                    url: '/faucet',
                    views: {
                        "main": {
                            controller: 'FaucetCtrl as ctrl',
                            templateUrl: '/templates/faucet.html'
                        }
                    }
                })
                .state('nodes', {
                    url: '/nodes',
                    views: {
                        "main": {
                            controller: 'NodesCtrl as ctrl',
                            templateUrl: '/templates/nodes.html'
                        }
                    }
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
                rewriteLinks: false
            });
        }
        ]);
})();
