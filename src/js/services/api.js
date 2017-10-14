(function (){
    'use strict';

    angular.module('web').factory('apiService', ['appConfig', 'apiProvider', ApiService]);

    function ApiService(appConfig, apiProvider) {
        return apiProvider(appConfig.apiDomain);
    }
})();