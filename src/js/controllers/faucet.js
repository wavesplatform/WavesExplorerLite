(function () {
	'use strict';

	function FaucetCtrl($http, apiService, appConfig, vcRecaptchaService) {
		var ctrl = this;

		if (appConfig.faucet) {
			ctrl.pubKey = appConfig.faucet.captchaKey;
			ctrl.uri = appConfig.faucet.url + "/payment";
		}

		ctrl.recipient = "";
		ctrl.invalidAddress = false;
		ctrl.error = null;

		ctrl.response = null;
		ctrl.widgetId = null;

		ctrl.getMoney = getMoney;
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
			validateAddress(ctrl.recipient).then(function (response) {
					if (response.data.valid) {
						var newPayment = {
							token: ctrl.response,
							recipient: cleanAddress(ctrl.recipient)
						};

						$http.post(ctrl.uri, newPayment).then(function (response) {
							if (response.data.status == "OK") {
								ctrl.tx = response.data.tx;
							} else {
								ctrl.error = response.data.message;
								vcRecaptchaService.reload(ctrl.widgetId);
							}
						})
						.catch(function (response) {
							if (response.data) {
								ctrl.error = response.data.message;
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
