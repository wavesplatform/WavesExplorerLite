(function () {
	'use strict';

	var LOADING_TEXT = '...';
	var FAILURE_TEXT = 'Failure';

	function BlocksDetailsCtrl($http, $q, apiService, $stateParams, $state) {
		var ctrl = this;
		ctrl.height = parseInt($stateParams.height);
		ctrl.next = nextBlock;
		ctrl.prev = prevBlock;

		var loadFees = [];
		var loadAmounts = [];
		var loadAssets = {};

		activate();

		function activate() {

			$http.get(apiService.blocks.byHeight(ctrl.height))
				.then(function (response) {
					ctrl.details = response.data;
					ctrl.details.transactions.forEach(function (item) {
						item.extras = {
							fee: LOADING_TEXT,
							amount: {
								amount: LOADING_TEXT,
								currency: LOADING_TEXT
							}
						}
					});

					ctrl.payments = txs(ctrl.details.transactions, 2)
						.concat(txs(ctrl.details.transactions, 1))
						.map(postProcessPaymentTransaction);
					ctrl.assetIssue = txs(ctrl.details.transactions, 3)
						.map(postProcessIssueTransaction);
					ctrl.assetReissue = txs(ctrl.details.transactions, 5)
						.map(postProcessReissueTransaction);
					ctrl.assetTransfer = txs(ctrl.details.transactions, 4)
						.map(postProcessTransferTransaction);

					ctrl.exchange = txs(ctrl.details.transactions, 7);

					ctrl.leasing = txs(ctrl.details.transactions, 8)
						.map(postProcessLeasingTransaction);
					ctrl.leasingCancel = txs(ctrl.details.transactions, 9)
						.map(postProcessAmountlessTransaction);

					ctrl.alias = txs(ctrl.details.transactions, 10)
						.map(postProcessAmountlessTransaction);

					var promises = Object.keys(loadAssets).map(function (assetId) {
						return $http.get(apiService.transactions.info(assetId))
							.then(function (response) {
								createCurrencyFromIssueTransaction(response.data);
							})
					});

					return $q.all(promises);
				})
				.then(function () {
					loadFees.forEach(function (transaction) {
						if (Currency.isCached(transaction.feeAsset)) {
							var currency = Currency.create({id: transaction.feeAsset});
							transaction.extras.fee = formatFee(transaction.fee, currency);
						} else {
							transaction.extras.fee = FAILURE_TEXT;
						}
					});

					loadAmounts.forEach(function (transaction) {
						var amountObject = transaction.extras.amount;
						if (Currency.isCached(amountObject.assetId)) {
							var currency = Currency.create({id: amountObject.assetId});
							amountObject.amount = Money.fromCoins(amountObject.raw, currency).formatAmount();
							amountObject.currency = currency.toString();
						} else {
							amountObject.amount = FAILURE_TEXT;
							amountObject.currency = FAILURE_TEXT;
						}
					});
				});
		}

		function postProcessTransferTransaction(transaction) {
			processFee(transaction);
			processAmount(transaction, transaction.amount, transaction.assetId);

			return transaction;
		}

		function postProcessPaymentTransaction(transaction) {
			processFee(transaction);
			processAmount(transaction, transaction.amount, Currency.WAVES.id);

			return transaction;
		}

		function postProcessIssueTransaction(transaction) {
			processFee(transaction);
			var currency = createCurrencyFromIssueTransaction(transaction);
			processAmount(transaction, transaction.quantity, currency);

			return transaction;
		}

		function createCurrencyFromIssueTransaction(transaction) {
			return Currency.create({
				id: transaction.assetId,
				displayName: transaction.name,
				precision: transaction.decimals
			});
		}

		function postProcessReissueTransaction(transaction) {
			processFee(transaction);
			processAmount(transaction, transaction.quantity, transaction.assetId);

			return transaction;
		}

		function postProcessAmountlessTransaction(transaction) {
			processFee(transaction);

			return transaction;
		}

		function postProcessLeasingTransaction(transaction) {
			processFee(transaction);
			processAmount(transaction, transaction.amount, Currency.WAVES.id);

			return transaction;
		}

		function processAmount(transaction, rawAmount, assetId) {
			var currency = Currency.WAVES;
			if (assetId) {
				if (!Currency.isCached(assetId)) {
					transaction.extras.amount.assetId = assetId;
					transaction.extras.amount.raw = rawAmount;
					loadAmounts.push(transaction);
					loadAssets[assetId] = true;

                    console.log(assetId);

					return
				}

				currency = Currency.create({id: assetId});
			}

			transaction.extras.amount.amount = Money.fromCoins(rawAmount, currency).formatAmount();
			transaction.extras.amount.currency = currency.toString();
		}

		function processFee(transaction) {
			var currency = Currency.WAVES;
			var assetId = transaction.feeAsset;
			if (assetId) {
				if (!Currency.isCached(assetId)) {
					loadFees.push(transaction);
					loadAssets[assetId] = true;

					return
				}

				currency = Currency.create({id: assetId});
			}

			transaction.extras.fee = formatFee(transaction.fee, currency);
		}

		function formatFee(fee, currency) {
			return Money.fromCoins(fee, currency).formatAmount(true) + ' ' + currency.toString();
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
