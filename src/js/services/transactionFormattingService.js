(function () {
    'use strict';

    var LOADING_TEXT = '...';
    var FAILURE_TEXT = 'Failure';
    var GENESIS_TRANSACTION_TYPE = 1;

    var FAILED_TO_CONVERT_AMOUNT = {
        amount: FAILURE_TEXT,
        currency: FAILURE_TEXT
    };

    function TransactionFormattingService($http, $q, apiService, cryptoService, constants) {
        var txToUpdate = [];
        var loadFees = [];
        var loadAmounts = [];
        var loadAssets = {};
        var processors = {};
        processors[GENESIS_TRANSACTION_TYPE] = postProcessPaymentTransaction;
        processors[constants.PAYMENT_TRANSACTION_TYPE] = postProcessPaymentTransaction;
        processors[constants.ASSET_ISSUE_TRANSACTION_TYPE] = postProcessIssueTransaction;
        processors[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = postProcessTransferTransaction;
        processors[constants.ASSET_BURN_TRANSACTION_TYPE] = postProcessBurnTransaction;
        processors[constants.EXCHANGE_TRANSACTION_TYPE] = postProcessExchangeTransaction;
        processors[constants.ASSET_REISSUE_TRANSACTION_TYPE] = postProcessReissueTransaction;
        processors[constants.START_LEASING_TRANSACTION_TYPE] = postProcessLeasingTransaction;
        processors[constants.MASS_PAYMENT_TRANSACTION_TYPE] = postProcessMassPaymentTransaction;
        processors[constants.SCRIPT_TRANSFER_TRANSACTION_TYPE] = postProcessScriptTransaction;
        processors[constants.SPONSOR_FEE_TRANSACTION_TYPE] = postProcessSponsorshipTransaction;

        function postProcessTransferTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.amount, transaction.assetId);

            return transaction;
        }

        function postProcessBurnTransaction(transaction) {
            return postProcessTransferTransaction(transaction);
        }

        function postProcessMassPaymentTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.totalAmount, transaction.assetId);

            transaction.update = function () {
                updateFee(transaction);
                updateMassPaymentAmount(transaction);
            };

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
            transaction.extras.amount.amount = Money.fromCoins(transaction.quantity, currency).formatAmount();
            transaction.extras.amount.currency = currency.toString();

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

            transaction.update = function () {
                updateFee(transaction);
                updateReissueAmount(transaction);
            };

            return transaction;
        }

        function postProcessAmountlessTransaction(transaction) {
            processFee(transaction);

            transaction.update = function () {
                updateFee(transaction);
            };

            return transaction;
        }

        function postProcessLeasingTransaction(transaction) {
            processFee(transaction);
            processAmount(transaction, transaction.amount, Currency.WAVES.id);

            return transaction;
        }

        function postProcessScriptTransaction(transaction) {
            transaction.recipient = transaction.sender;

            processFee(transaction);

            transaction.update = function () {
            };

            return transaction;
        }

        function postProcessSponsorshipTransaction(transaction) {
            processFee(transaction);

            if (transaction.minSponsoredAssetFee)
                processAmount(transaction, transaction.minSponsoredAssetFee, transaction.assetId);

            transaction.update = function () {
                updateSponsorshipTransactionAmount(transaction);
            }
        }

        function postProcessExchangeTransaction(transaction) {
            processFee(transaction);

            var pair = _.extend({}, transaction.order1.assetPair);
            if (pair.amountAsset === null)
                pair.amountAsset = '';
            if (pair.priceAsset === null)
                pair.priceAsset = '';

            processAmount(transaction, transaction.amount, pair.amountAsset);

            transaction.pair = pair;
            transaction.update = function () {
                updateFee(transaction);
                updateExchangeAmount(transaction);
                updateExchangeCurrencies(transaction);
            };

            var from = transaction.order1.orderType === 'buy' ? transaction.order2.senderPublicKey : transaction.order1.senderPublicKey;
            var to = transaction.order1.orderType === 'sell' ? transaction.order2.senderPublicKey : transaction.order1.senderPublicKey;

            var price;
            if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                var currencyPair = {
                    amountAsset: Currency.create({id: pair.amountAsset}),
                    priceAsset: Currency.create({id: pair.priceAsset})
                };
                var orderPrice = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens();
                var amount = Money.fromCoins(transaction.amount, currencyPair.amountAsset);
                price = orderPrice.toFixed(8);
                transaction.extras.priceCurrency = currencyPair.priceAsset.toString();
                transaction.extras.amountCurrency = currencyPair.amountAsset.toString();
                transaction.extras.total.amount = (price * amount.toTokens()).toFixed(currencyPair.priceAsset.precision);
                transaction.extras.total.currency = transaction.extras.priceCurrency;
            } else {
                if (!Currency.isCached(pair.priceAsset))
                    loadAssets[pair.priceAsset] = true;

                txToUpdate.push(transaction);

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
                    txToUpdate.push(transaction);
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
                    txToUpdate.push(transaction);
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

        function updateFee(transaction) {
            if (!transaction.feeAsset)
                return;

            if (!Currency.isCached(transaction.feeAsset)) {
                transaction.extras.fee = FAILURE_TEXT;
            }
            else {
                var currency = Currency.create({id: transaction.feeAsset});
                transaction.extras.fee = formatFee(transaction.fee, currency);
            }
        }

        function updateAmount(transaction) {
            if (!transaction.assetId)
                return;

            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateReissueAmount(transaction) {
            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.quantity, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateMassPaymentAmount(transaction) {
            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.totalAmount, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateSponsorshipTransactionAmount(transaction) {
            if (!transaction.minSponsoredAssetFee)
                return;

            if (!Currency.isCached(transaction.assetId)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: transaction.assetId});
                transaction.extras.amount.amount = Money.fromCoins(transaction.minSponsoredAssetFee, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateExchangeAmount(transaction) {
            var pair = transaction.pair;
            if (!pair.amountAsset)
                return;

            if (!Currency.isCached(pair.amountAsset)) {
                transaction.extras.amount = FAILED_TO_CONVERT_AMOUNT;
            }
            else {
                var currency = Currency.create({id: pair.amountAsset});
                transaction.extras.amount.amount = Money.fromCoins(transaction.amount, currency).formatAmount();
                transaction.extras.amount.currency = currency.toString();
            }
        }

        function updateExchangeCurrencies(transaction) {
            var pair = transaction.pair;
            if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                var currencyPair = {
                    amountAsset: Currency.create({id: pair.amountAsset}),
                    priceAsset: Currency.create({id: pair.priceAsset})
                };
                var price = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens();
                var amount = Money.fromCoins(transaction.amount, currencyPair.amountAsset);
                transaction.extras.price = OrderPrice.fromBackendPrice(transaction.price, currencyPair).toTokens().toFixed(8);
                transaction.extras.priceCurrency = currencyPair.priceAsset.toString();
                transaction.extras.total.amount = (price * amount.toTokens()).toFixed(currencyPair.priceAsset.precision);
                transaction.extras.total.currency = transaction.extras.priceCurrency;
            }
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
                    },
                    total: {
                        amount: LOADING_TEXT,
                        currency: LOADING_TEXT
                    },
                    version: item.version || 'N/A',
                    proofs: item.proofs || [item.signature]
                };
                item.update = function () {
                    updateFee(item);
                    updateAmount(item);
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
                txToUpdate.forEach(function (transaction) {
                    transaction.update();
                });
            });
        }
    }

    angular
        .module('web')
        .service('transactionFormattingService', ['$http', '$q', 'apiService', 'cryptoService', 'constants.transactions',
            TransactionFormattingService]);
})();
