(function () {
	'use strict';

	var GENESIS_TRANSACTION_TYPE = 1;

	function BlocksDetailsCtrl($http, apiService, transactionFormattingService, $stateParams, $state, constants) {
		var ctrl = this;
		ctrl.height = parseInt($stateParams.height);
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		activate();

		function activate() {

			$http.get(apiService.blocks.byHeight(ctrl.height))
				.then(function (response) {
					ctrl.details = response.data;

					ctrl.payments = txs(ctrl.details.transactions, constants.PAYMENT_TRANSACTION_TYPE)
						.concat(txs(ctrl.details.transactions, GENESIS_TRANSACTION_TYPE));
					ctrl.assetIssue = txs(ctrl.details.transactions, 3);
					ctrl.assetReissue = txs(ctrl.details.transactions, 5);
					ctrl.assetTransfer = txs(ctrl.details.transactions, 4);
					ctrl.assetBurn = txs(ctrl.details.transactions, 6);

					ctrl.exchange = txs(ctrl.details.transactions, 7);

					ctrl.leasing = txs(ctrl.details.transactions, 8);
					ctrl.leasingCancel = txs(ctrl.details.transactions, 9);

					ctrl.alias = txs(ctrl.details.transactions, constants.CREATE_ALIAS_TRANSACTION_TYPE);
					ctrl.massPayment = txs(ctrl.details.transactions, constants.MASS_PAYMENT_TRANSACTION_TYPE);
					ctrl.dataTransactions = txs(ctrl.details.transactions, constants.DATA_TRANSACTION_TYPE);
					ctrl.scripts = txs(ctrl.details.transactions, constants.SCRIPT_TRANSFER_TRANSACTION_TYPE);
					ctrl.sponsorships = txs(ctrl.details.transactions, constants.SPONSOR_FEE_TRANSACTION_TYPE);

					return transactionFormattingService.processAmountAndFee(ctrl.details.transactions);
				})
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

	angular.module('web').controller('BlocksDetailsCtrl',
		['$http', 'apiService', 'transactionFormattingService', '$stateParams', '$state', 'constants.transactions',
			BlocksDetailsCtrl]);
})();
