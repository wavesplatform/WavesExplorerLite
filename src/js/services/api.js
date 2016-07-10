(function (){
    'use strict';

    angular.module('web').factory('apiService', ['appConfig','apiProvider', Service]);
    
    function Service(appConfig, apiProvider) {
        return apiProvider(appConfig.apiDomain);
    }
})();