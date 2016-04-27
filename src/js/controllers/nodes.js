(function () {
	'use strict';

	function NodesCtrl($http, apiProvider) {
		var ctrl = this;

		ctrl.nodes = [
			{ url: 'http://52.36.177.184:6869' },
			{ url: 'http://52.58.115.4:6869' },
			{ url: 'http://82.165.138.42:6869' },
			{ url: 'http://52.74.26.138:6869' }
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
						
					});
		}
	}

	angular.module('web').controller('NodesCtrl', NodesCtrl);
})();
