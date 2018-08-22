(function () {
    'use strict';

    angular.module('web').factory('apiProvider', apiProvider);

    function apiProvider() {
        return function (nodeUrl, dataServiceUrl) {
            return apiInterface(nodeUrl, dataServiceUrl);
        }
    }

    function apiInterface(nodeUrl, dataServiceUrl) {
        return {
            version: nodeUrl + '/node/version',
            status: nodeUrl + '/node/status',
            blocks: {
                seq: function (from, to) {
                    return nodeUrl + '/blocks/seq/' + from + '/' + to;
                },
                byHeight: function (height) {
                    return nodeUrl + '/blocks/at/' + height;
                },
                bySignature: function (signature) {
                    return nodeUrl + '/blocks/signature/' + signature;
                },
                delay: function (fromSig, count) {
                    return nodeUrl + '/blocks/delay/' + fromSig + '/' + count;
                },
                height: nodeUrl + '/blocks/height',
                last: nodeUrl + '/blocks/last',
                headers: {
                    seq: function (from, to) {
                        return nodeUrl + '/blocks/headers/seq/' + from + '/' + to;
                    },
                    byHeight: function (height) {
                        return nodeUrl + '/blocks/headers/at/' + height;
                    },
                    last: nodeUrl + '/blocks/headers/last'
                }
            },
            address: {
                balance: function (address) {
                    return nodeUrl + '/addresses/balance/' + address;
                },

                validate: function (address) {
                    return nodeUrl + '/addresses/validate/' + address;
                },
                balanceDetails: function (address) {
                    return nodeUrl + '/addresses/balance/details/' + address;
                },
                data: function (address) {
                    return nodeUrl + '/addresses/data/' + address;
                },
                script: function (address) {
                    return nodeUrl + '/addresses/scriptInfo/' + address;
                }
            },
            aliases: {
                getAddress: function (alias) {
                    return dataServiceUrl + '/aliases/' + encodeURIComponent(alias);
                },
                forAddress: function (address) {
                    return dataServiceUrl + '/aliases?address=' + encodeURIComponent(address);
                }
            },
            assets: {
                balance: function (address) {
                    return nodeUrl + '/assets/balance/' + address;
                }
            },
            transactions: {
                utxSize: nodeUrl + '/transactions/unconfirmed/size',
                unconfirmed: nodeUrl + '/transactions/unconfirmed',
                info: function (signature) {
                    return nodeUrl + '/transactions/info/' + signature;
                },
                forAddress: function (address) {
                    return nodeUrl + '/transactions/address/' + address + '/limit/100';
                }

            },
            consensus: {
                puz: nodeUrl + '/consensus/puz',
                algo: nodeUrl + '/consensus/algo',
                basetarget: nodeUrl + '/consensus/basetarget',
                generatingBalance: function (address) {
                    return nodeUrl + '/consensus/generatingbalance/' + address;
                }
            },
            peers: {
                all: nodeUrl + '/peers/all',
                connected: nodeUrl + '/peers/connected'
            }
        }
    }
})();