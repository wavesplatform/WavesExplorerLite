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
                height: url + '/blocks/height',
                last: url + '/blocks/last',
                headers: {
                    seq: function (from, to) {
                        return url + '/blocks/headers/seq/' + from + '/' + to;
                    },
                    byHeight: function (height) {
                        return url + '/blocks/headers/at/' + height;
                    },
                    last: url + '/blocks/headers/last'
                }
            },
            address: {
                balance: function (address) {
                    return url + '/addresses/balance/' + address;
                },

                validate: function (address) {
                    return url + '/addresses/validate/' + address;
                },
                balanceDetails: function (address) {
                    return url + '/addresses/balance/details/' + address;
                },
                data: function (address) {
                    return url + '/addresses/data/' + address;
                },
                script: function (address) {
                    return url + '/addresses/scriptInfo/' + address;
                }
            },
            aliases: {
                getAddress: function (alias) {
                    return url + '/alias/by-alias/' + encodeURIComponent(alias);
                },
                forAddress: function (address) {
                    return url + '/alias/by-address/' + address;
                }
            },
            assets: {
                balance: function (address) {
                    return url + '/assets/balance/' + address;
                }
            },
            transactions: {
                utxSize: url + '/transactions/unconfirmed/size',
                unconfirmed: url + '/transactions/unconfirmed',
                info: function (signature) {
                    return url + '/transactions/info/' + signature;
                },
                forAddress: function (address) {
                    return url + '/transactions/address/' + address + '/limit/100';
                }

            },
            consensus: {
                puz: url + '/consensus/puz',
                algo: url + '/consensus/algo',
                basetarget: url + '/consensus/basetarget',
                generatingBalance: function (address) {
                    return url + '/consensus/generatingbalance/' + address;
                }
            },
            peers: {
                all: url + '/peers/all',
                connected: url + '/peers/connected'
            }
        }
    }
})();