(function () {
    'use strict';

    var LOADING_TEXT = '...';
    var FAILURE_TEXT = 'Failure';
    var GENESIS_TRANSACTION_TYPE = 1;

    function TransactionFormattingService($http, $q, apiService, cryptoService, constants) {

        var loadFees = [];
        var loadAmounts = [];
        var loadAssets = {};
        var processors = {};
        processors[GENESIS_TRANSACTION_TYPE] = postProcessPaymentTransaction;
        processors[constants.PAYMENT_TRANSACTION_TYPE] = postProcessPaymentTransaction;
        processors[constants.ASSET_ISSUE_TRANSACTION_TYPE] = postProcessIssueTransaction;
        processors[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = postProcessTransferTransaction;
        processors[constants.EXCHANGE_TRANSACTION_TYPE] = postProcessExchangeTransaction;
        processors[constants.ASSET_REISSUE_TRANSACTION_TYPE] = postProcessReissueTransaction;
        processors[constants.START_LEASING_TRANSACTION_TYPE] = postProcessLeasingTransaction;

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

        function postProcessExchangeTransaction(transaction) {
            processFee(transaction);

            var pair = _.extend({}, transaction.order1.assetPair);
            if (pair.amountAsset === null)
                pair.amountAsset = '';
            if (pair.priceAsset === null)
                pair.priceAsset = '';
            processAmount(transaction, transaction.amount, pair.amountAsset);

            var from = transaction.order1.orderType === 'buy' ? transaction.order2.senderPublicKey : transaction.order1.senderPublicKey;
            var to = transaction.order1.orderType === 'sell' ? transaction.order2.senderPublicKey : transaction.order1.senderPublicKey;

            var price;
            if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                var currencyPair = {
                    amountAsset: Currency.create({id: pair.amountAsset}),
                    priceAsset: Currency.create({id: pair.priceAsset})
                };
                price = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens().toFixed(8);
                transaction.extras.priceCurrency = currencyPair.priceAsset.toString();
                transaction.extras.amountCurrency = currencyPair.amountAsset.toString();
            } else {
                price = transaction.price.toString();
            }

            transaction.extras.from = cryptoService.buildRawAddress(from);
            transaction.extras.to = cryptoService.buildRawAddress(to);
            transaction.extras.price = price;

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

        function processTransaction(transaction) {
            var processor = processors[transaction.type];
            if (processor)
                processor(transaction);
            else
                postProcessAmountlessTransaction(transaction);
        }

        this.processAmountAndFee = function (transactions) {
            loadFees = [];
            loadAmounts = [];
            loadAssets = {};

            transactions.forEach(function (item) {
                item.extras = {
                    fee: LOADING_TEXT,
                    amount: {
                        amount: LOADING_TEXT,
                        currency: LOADING_TEXT
                    }
                };

                processTransaction(item);
            });

            var promises = Object.keys(loadAssets).map(function (assetId) {
                return $http.get(apiService.transactions.info(assetId))
                    .then(function (response) {
                        createCurrencyFromIssueTransaction(response.data);
                    })
            });

            return $q.all(promises).then(function () {
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

    }

    angular
        .module('web')
        .service('transactionFormattingService', ['$http', '$q', 'apiService', 'cryptoService', 'constants.transactions',
            TransactionFormattingService]);
})();
