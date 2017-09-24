(function() {
	'use strict';

	function PeersCtrl($http, apiService) {
		var ctrl = this;

		activate();

		function activate() {
			$http.get(apiService.peers.all).then(function (response) {
				ctrl.peers = response.data;
			});
			$http.get(apiService.peers.connected).then(function (response) {
				ctrl.connectedPeers = response.data.peers;
			});
		}
	}

	angular.module('web').controller('PeersCtrl', PeersCtrl);
})();
