(function () {
	'use strict';

	function BlocksDetailsCtrl($http, apiMethods, $stateParams, $state) {
		var ctrl = this;
		ctrl.height = parseInt($stateParams.height);
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {

			$http.get(apiMethods.blocks.byHeight(ctrl.height))
							.success(function (data) {
								ctrl.details = data;
							})
		}

		function nextBlock() {
			$state.go('block-details', {height: ctrl.height + 1});
		}

		function prevBlock() {
			if (ctrl.height > 1)
				$state.go('block-details', {height: ctrl.height - 1});
		}

	}

	angular.module('web').controller('BlocksDetailsCtrl', BlocksDetailsCtrl);
})();
