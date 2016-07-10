(function() {
	'use strict';
	
	function PeersCtrl($http, apiService) {
		var ctrl = this;
		
		activate();
		
		function activate() {
			$http.get(apiService.peers.all)
							.success(function(data){
								ctrl.peers = data[0];
			});
			$http.get(apiService.peers.connected)
							.success(function (data){
								ctrl.connectedPeers = data.peers[0];
			});
		}
	}
	
	angular.module('web').controller('PeersCtrl', PeersCtrl);
})();