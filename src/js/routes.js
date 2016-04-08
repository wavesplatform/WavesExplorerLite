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
							.state('block-details', {
								url: '/blocks/:height',
								views: {
									"main": {
										controller: 'BlocksDetailsCtrl as ctrl',
										templateUrl: '/js/views/block-details.html'
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