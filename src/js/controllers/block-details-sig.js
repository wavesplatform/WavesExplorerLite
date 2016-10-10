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
								ctrl.height = data.height
								
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

	angular.module('web').controller('BlocksDetailsSigCtrl', BlocksDetailsSigCtrl);
})();
