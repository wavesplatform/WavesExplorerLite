(function () {
	'use strict';

	function NodesCtrl($http, apiProvider) {
		var ctrl = this;

//		ctrl.nodes = [
//			{ url: 'http://52.36.177.184:6869' },
//			{ url: 'http://52.28.28.118:6869' },
//			{ url: 'http://82.165.138.42:6869' },
//			{ url: 'http://52.74.26.138:6869' },
//			{ url: 'http://52.51.92.182:6869' },
//			{ url: 'http://52.63.116.99:6869' }
//		];

		ctrl.nodes = [
			{ url: 'https://nodes.wavesnodes.com', maintainer:'Waves' }
		];

		activate();

		function activate() {
			ctrl.nodes.forEach(function (node) {
				
				$http.get(apiProvider(node.url).version)
						.success(function (data) {
							node.version = data.version;
						}).error(function () {
							node.version = "error";
						});
						
				$http.get(apiProvider(node.url).blocks.height)
						.success(function (data) {
							node.height = data.height;
						}).error(function () {
							node.height = "error";
						});
						
														
				$http.get(apiProvider(node.url).consensus.basetarget)
						.success(function (data) {
							node.baseTarget = data.baseTarget;
						}).error(function () {
							node.baseTarget = "error";
						});
				$http.get(apiProvider(node.url).debug.info)
						.success(function (data) {
							node.debugStateHeight = data.stateHeight;
							node.debugStateHash = data.stateHash;
						}).error(function () {
							node.debugStateHeight = "error";
							node.debugStateHash = "error";
						});
					});

						
		}
	}

	angular.module('web').controller('NodesCtrl', NodesCtrl);
})();
