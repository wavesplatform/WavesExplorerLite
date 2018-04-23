(function() {
    'use strict';

    var GENESIS_TRANSACTION_TYPE = 1;

    angular.module('web').filter('txtype', ['constants.transactions', function(constants) {
        var TRANSACTION_TYPES = buildTransactionTypesTable();

        return function(input, useLongNames) {
            if (!angular.isNumber(input))
                return null;

            var type = parseInt(input);

            return getTransactionTypeName(type, useLongNames);
        };

        function getTransactionTypeName(type, useLongNames) {
            var name = TRANSACTION_TYPES[type];
            if (!name)
                return 'Unknown';

            return (!useLongNames && name.short) ? name.short : name.long;
        }

        function buildTransactionTypesTable() {
            var result = {};
            result[GENESIS_TRANSACTION_TYPE] = {
                long: 'Genesis'
            };
            result[constants.PAYMENT_TRANSACTION_TYPE] = {
                long: 'Payment'
            };
            result[constants.ASSET_ISSUE_TRANSACTION_TYPE] = {
                long: 'Asset issue'
            };
            result[constants.ASSET_TRANSFER_TRANSACTION_TYPE] = {
                long: 'Transfer'
            };
            result[constants.ASSET_REISSUE_TRANSACTION_TYPE] = {
                long: 'Asset re-issue'
            };
            result[constants.EXCHANGE_TRANSACTION_TYPE] = {
                long: 'Exchange'
            };
            result[constants.START_LEASING_TRANSACTION_TYPE] = {
                long: 'Start leasing'
            };
            result[constants.CANCEL_LEASING_TRANSACTION_TYPE] = {
                long: 'Cancel leasing'
            };
            result[constants.CREATE_ALIAS_TRANSACTION_TYPE] = {
                short: 'Alias',
                long: 'Create alias'
            };
            result[constants.MASS_PAYMENT_TRANSACTION_TYPE] = {
                long: 'Mass payment'
            };

            return result;
        }
    }]);
})();
