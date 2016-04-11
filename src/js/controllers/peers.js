(function() {
	'use strict';
	
	function PeersCtrl($http, apiMethods) {
		var ctrl = this;
		
		activate();
		
		function activate() {
			$http.get(apiMethods.peers.all)
							.success(function(data){
								ctrl.peers = data[0];
			});
			$http.get(apiMethods.peers.connected)
							.success(function (data){
								ctrl.connectedPeers = data.peers[0];
			});
		}
	}
	
	angular.module('web').controller('PeersCtrl', PeersCtrl);
})();