(function () {
	'use strict';

	function BlocksDetailsCtrl($http, apiService, $stateParams, $state) {
		var ctrl = this;
		ctrl.height = parseInt($stateParams.height);
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {

			$http.get(apiService.blocks.byHeight(ctrl.height))
							.success(function (data) {
								ctrl.details = data;

								ctrl.payments = txs(ctrl.details.transactions, 2);
								ctrl.assetIssue = txs(ctrl.details.transactions, 3);
								ctrl.assetTransfer = txs(ctrl.details.transactions, 4);
							});
		}

		function txs(trans, type) {
			if (trans) {
				return trans.filter(function(tx){return tx.type === type;});
			}
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
