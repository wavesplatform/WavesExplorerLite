(function () {
	'use strict';

	function BlocksDetailsSigCtrl($http, apiService, $stateParams, $state) {
		var ctrl = this;
		ctrl.signature = $stateParams.signature;
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {

			$http.get(apiService.blocks.bySignature(ctrl.signature))
							.success(function (data) {
								ctrl.details = data;
							});
		}

		function nextBlock() {
			$state.go('block-details', {height: ctrl.height + 1});
		}

		function prevBlock() {
			if (ctrl.height > 1)
				$state.go('block-details', {height: ctrl.height - 1});
		}

	}

	angular.module('web').controller('BlocksDetailsSigCtrl', BlocksDetailsSigCtrl);
})();
