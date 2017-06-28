(function () {
	'use strict';

	function FaucetCtrl($http, apiService, appConfig, vcRecaptchaService) {
		var ctrl = this;
		ctrl.pubKey = appConfig.captchaKey;
		ctrl.uri = appConfig.faucetUrl + "/payment";
		ctrl.getMoney = getMoney;

		ctrl.recipient = "";
		ctrl.invalidAddress = false;
		ctrl.error = null;

		ctrl.response = null;
		ctrl.widgetId = null;

		ctrl.setResponse = function (response) {
            ctrl.response = response;
        };

		ctrl.setWidgetId = function (widgetId) {
			ctrl.widgetId = widgetId;
		};

		ctrl.cbExpiration = function() {
			vcRecaptchaService.reload(ctrl.widgetId);
			ctrl.response = null;
		};


		function getMoney() {
			ctrl.invalidAddress = false;
			ctrl.tx = null;
			ctrl.error = null;

			if (!ctrl.recipient || ctrl.recipient.length == 0) {
				ctrl.invalidAddress = true;
				return;
			}
			if (ctrl.response == null || ctrl.response === "") {
				ctrl.error = "Please resolve the captcha";
				return;
			}
			validateAddress(ctrl.recipient)
					.success(function (result) {
						if (result.valid) {
							var newPayment = {
								token: ctrl.response,
								recipient: cleanAddress(ctrl.recipient)
							};

							$http.post(ctrl.uri, newPayment)
									.success(function (data) {
										if (data.status == "OK") {
											ctrl.tx = data.tx;
										} else {
											ctrl.error = data.message;
											vcRecaptchaService.reload(ctrl.widgetId);
										}
									})
									.error(function (data) {
										if (data) {
											ctrl.error = data.message;
											vcRecaptchaService.reload(ctrl.widgetId);
										}
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
