(function () {
    'use strict';

    angular.module('web').factory('apiProvider', apiProvider);

    function apiProvider() {
        return function (nodeUrl) {
            return apiInterface(nodeUrl);
        }
    }

    function apiInterface(url) {
        return {
            version: url + '/node/version',
            status: url + '/node/status',
            blocks: {
                height: url + '/blocks/height',
                seq: function (from, to) {
                    return url + '/blocks/seq/' + from + '/' + to;
                },
                byHeight: function (height) {
                    return url + '/blocks/at/' + height;
                },
                bySignature: function (signature) {
                    return url + '/blocks/signature/' + signature;
                },
                delay: function (fromSig, count) {
                    return url + '/blocks/delay/' + fromSig + '/' + count;
                },
                last: url + '/blocks/last'
            },
            address: {
                balance: function (address) {
                    return url + '/addresses/balance/' + address;
                },

                validate: function (address) {
                    return url + '/addresses/validate/' + address;
                }
            },
            transactions: {
                utxSize: url + '/transactions/unconfirmed/size',
                unconfirmed: url + '/transactions/unconfirmed',
                info: function (signature) {
                    return url + '/transactions/info/' + signature;
                },
                forAddress: function (address) {
                    return url + '/transactions/address/' + address + '/limit/50';
                }

            },
            consensus: {
                puz: url + '/consensus/puz',
                algo: url + '/consensus/algo',
                basetarget: url + '/consensus/basetarget',
                generatingBalance: function (address) {
                    return url + '/consensus/generatingbalance/' + address;
                },
            },
            peers: {
                all: url + '/peers/all',
                connected: url + '/peers/connected'
            },
            debug: {
                info: url + '/debug/info'
            }
        }
    }
})();