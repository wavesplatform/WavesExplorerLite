(function(){
	'use strict';
	
	function TxDetailsCtrl($http, $stateParams, apiMethods) {
		var ctrl = this;
		ctrl.signature = $stateParams.signature;
		
		activate();
		
		function activate() {
			
		}
	}
	
	angular.module('web').controller('TxDetailsCtrl', TxDetailsCtrl);
})();