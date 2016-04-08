(function () {
	'use strict';

	var URL = 'http://23.94.190.226:9081';

	angular.module('web').constant('apiMethods', {
		version: URL + '/scorex/version',
		status: URL + '/scorex/status',
		blocks: {
			height: URL + '/blocks/height',
			seq: function (from, to) {
				return URL + '/blocks/seq/' + from + '/' + to;
			},
			byHeight: function (height) {
				return URL + '/blocks/at/' + height;
			},
			bySignature: function (signature) {
				return URL + '/blocks/signature/' + signature;
			}
		},
		address: {
			balance: function (address) {
				return URL + '/addresses/balance/' + address;
			},
			validate: function (address) {
				return URL + '/addresses/validate/' + address;
			}
		},
		transactions: {
			unconfirmed: URL + '/transactions/unconfirmed',
			forAddress: function (address) {
				return URL + '/transactions/address/' + address + '/limit/50';
			}

		},
		consensus: {
			puz: URL + '/consensus/puz',
			algo: URL + '/consensus/algo',
			target: URL + '/consensus/target'
		}

	});
})();