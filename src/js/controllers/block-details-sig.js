(function () {
	'use strict';

	function BlocksDetailsSigCtrl($http, apiService, transactionFormattingService, $stateParams, $state) {
		var ctrl = this;
		ctrl.signature = $stateParams.signature;
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {
			$http.get(apiService.blocks.bySignature(ctrl.signature))
				.then(function (response) {
					ctrl.details = response.data;
					ctrl.height = response.data.height;

					ctrl.payments = txs(ctrl.details.transactions, 2).concat(txs(ctrl.details.transactions, 1));
					ctrl.assetIssue = txs(ctrl.details.transactions, 3);
					ctrl.assetReissue = txs(ctrl.details.transactions, 5);
					ctrl.assetTransfer = txs(ctrl.details.transactions, 4);

					ctrl.exchange = txs(ctrl.details.transactions, 7);

					ctrl.leasing = txs(ctrl.details.transactions, 8);
					ctrl.leasingCancel = txs(ctrl.details.transactions, 9);

					ctrl.alias = txs(ctrl.details.transactions, 10);
					ctrl.massPayment = txs(ctrl.details.transactions, 11);

					return transactionFormattingService.processAmountAndFee(ctrl.details.transactions);
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
