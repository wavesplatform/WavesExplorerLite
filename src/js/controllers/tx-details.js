(function() {
    'use strict';

    function TxDetailsCtrl($http, transactionFormattingService, $stateParams, apiService, cryptoService, constants) {
        var ctrl = this;
        ctrl.id = $stateParams.id;
        ctrl.isUnknownTransaction = false;

        activate();


        function activate() {
            $http.get(apiService.transactions.info(ctrl.id)).then(function (response) {
                ctrl.details = response.data;

                ctrl.isUnknownTransaction = ctrl.details.type > constants.DATA_TRANSACTION_TYPE;

                return transactionFormattingService.processAmountAndFee([ctrl.details]);
            }).then(function () {
                if (ctrl.details.type === constants.EXCHANGE_TRANSACTION_TYPE) {
                    var pair = _.extend({}, ctrl.details.order1.assetPair);
                    if (pair.amountAsset === null)
                        pair.amountAsset = '';
                    if (pair.priceAsset === null)
                        pair.priceAsset = '';

                    if (Currency.isCached(pair.amountAsset) && Currency.isCached(pair.priceAsset)) {
                        var currencyPair = {
                            amountAsset: Currency.create({id: pair.amountAsset}),
                            priceAsset: Currency.create({id: pair.priceAsset})
                        };

                        ctrl.details.order1.price = OrderPrice.fromBackendPrice(ctrl.details.order1.price, currencyPair).toTokens().toFixed(8);
                        ctrl.details.order1.amount = Money.fromCoins(ctrl.details.order1.amount, currencyPair.amountAsset).formatAmount();
                        ctrl.details.order1.address = cryptoService.buildRawAddress(ctrl.details.order1.senderPublicKey);
                        ctrl.details.order2.price = OrderPrice.fromBackendPrice(ctrl.details.order2.price, currencyPair).toTokens().toFixed(8);
                        ctrl.details.order2.amount = Money.fromCoins(ctrl.details.order2.amount, currencyPair.amountAsset).formatAmount();
                        ctrl.details.order2.address = cryptoService.buildRawAddress(ctrl.details.order2.senderPublicKey);
                    }
                } else if (ctrl.details.type === constants.MASS_PAYMENT_TRANSACTION_TYPE) {
                    var currency = Currency.WAVES;
                    if (ctrl.details.assetId)
                        currency = Currency.create({id: ctrl.details.assetId});

                    ctrl.details.transfers.forEach(function (item) {
                        var amount = Money.fromCoins(item.amount, currency);
                        item.extras = {
                            amount: {
                                amount: amount.formatAmount(),
                                currency: currency.toString()
                            }
                        }
                    });
                }
            });
        }
    }

    angular.module('web').controller('TxDetailsCtrl',
        ['$http', 'transactionFormattingService', '$stateParams', 'apiService', 'cryptoService', 'constants.transactions',
            TxDetailsCtrl]);
})();
