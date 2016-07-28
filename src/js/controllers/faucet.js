(function () {
	'use strict';

	function FaucetCtrl($http, apiService, appConfig) {
		var ctrl = this;
		ctrl.uri = appConfig.faucetUrl + "/payment";
		ctrl.getMoney = getMoney;

		ctrl.recipient = "";
		ctrl.invalidAddress = false;
		ctrl.error = null;

		function getMoney() {
			ctrl.invalidAddress = false;
			ctrl.tx = null;
			ctrl.error = null;

			if (!ctrl.recipient || ctrl.recipient.length == 0) {
				ctrl.invalidAddress = true;
				return;
			}

			validateAddress(ctrl.recipient)
					.success(function (result) {
						if (result.valid) {
							var newPayment = {
								recipient: cleanAddress(ctrl.recipient)
							};
							$http.post(ctrl.uri, newPayment)
									.success(function (data) {
										if (data.status == "OK") {
											ctrl.tx = data.tx;
										} else {
											ctrl.error = data.message;
										}
									})
									.error(function (data) {
										if (data)
											ctrl.error = data.message;
							});
						} else {
							ctrl.invalidAddress = true;
						}
					});
		}

		function validateAddress(address) {
			return $http.get(apiService.address.validate(cleanAddress(address)))
		}

		function cleanAddress(address) { return address.replace(/^1W/,""); }
	}

	angular.module('web').controller('FaucetCtrl', FaucetCtrl)
})();
