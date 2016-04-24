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
										templateUrl: '/js/views/general.html'
									}
								}
							})
							.state('address-details', {
								url: '/address/:address',
								views: {
									"main": {
										controller: 'AddressDetailsCtrl as ctrl',
										templateUrl: '/js/views/address-details.html'
									}
								}
							})
							.state('blocks', {
								url: '/blocks',
								views: {
									"main": {
										controller: 'BlocksCtrl as ctrl',
										templateUrl: '/js/views/blocks.html'
									}
								}
							})
							.state('block-details-sig', {
								url: '/blocks/s/:signature',
								views: {
									"main": {
										controller: 'BlocksDetailsSigCtrl as ctrl',
										templateUrl: '/js/views/block-details-sig.html'
									}
								}
							})
							.state('block-details', {
								url: '/blocks/:height',
								views: {
									"main": {
										controller: 'BlocksDetailsCtrl as ctrl',
										templateUrl: '/js/views/block-details.html'
									}
								}
							})
							.state('tx-details', {
								url: '/tx/:signature',
								views: {
									"main": {
										controller: 'TxDetailsCtrl as ctrl',
										templateUrl: '/js/views/tx-details.html'
									}
								}
							})
							.state('peers', {
								url: '/peers',
								views: {
									"main": {
										controller: 'PeersCtrl as ctrl',
										templateUrl: '/js/views/peers.html'
									}
								}
							})
							.state('faucet', {
								url: '/faucet',
								views: {
									"main": {
										controller: 'FaucetCtrl as ctrl',
										templateUrl: '/js/views/faucet.html'
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