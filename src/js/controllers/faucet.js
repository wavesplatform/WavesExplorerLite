(function () {
	'use strict';

	function FaucetCtrl($http, apiService) {
		var uri = "http://52.28.28.118:9000/payment";

		var ctrl = this;
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
								recipient: ctrl.recipient
							};
							$http.post(uri, newPayment)
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
			return $http.get(apiService.address.validate(address))
		}
	}

	angular.module('web').controller('FaucetCtrl', FaucetCtrl)
})();

