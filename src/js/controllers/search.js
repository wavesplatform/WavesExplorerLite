(function(){
	'use strict';
	
	function SearchCtrl($scope, $state) {
		
		$scope.search = search;
		
		function search() {
			$state.go('address-details', {address: $scope.address});
		}
	}
	
	angular.module('web').controller('SearchCtrl', SearchCtrl);
})();

