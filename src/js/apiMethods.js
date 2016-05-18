(function () {
	'use strict';

	var URL = 'http://52.36.177.184:6869';

	angular.module('web').constant('apiMethods', apiInterface(URL));

	angular.module('web').factory('apiProvider', apiProvider);

	function apiProvider() {
		return function (nodeUrl) {
			return apiInterface(nodeUrl);
		}
	}
	
	function apiInterface(url) {
		return {
			version: url + '/scorex/version',
			status: url + '/scorex/status',
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
				}
			},
			address: {
				balance: function (address) {
					return url + '/addresses/balance/' + address;
				},
				generatingBalance: function (address) {
					return url + '/addresses/generatingbalance/' + address;
				},
				validate: function (address) {
					return url + '/addresses/validate/' + address;
				}
			},
			transactions: {
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
				basetarget: url + '/consensus/basetarget'
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