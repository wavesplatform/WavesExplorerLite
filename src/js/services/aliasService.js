(function (){
    'use strict';

    var ALIAS_PREFIX = 'alias';

    function Alias(networkCode, alias) {
        this.networkCode = networkCode;

        this.text = alias.trim();

        this.toString = function () {
            return ALIAS_PREFIX + ':' + this.networkCode + ':' + this.text;
        }
    }

    Alias.isAlias = function (candidate) {
        return candidate.trim().search(ALIAS_PREFIX) == 0;
    };

    Alias.fromString = function (candidate) {
        var parts = candidate.split(':');
        if (parts.length != 3)
            throw new Error('Too few elements in alias: ' + candidate);

        if (parts[0] !== ALIAS_PREFIX)
            throw new Error('Unexpected alias prefix: ' + candidate);

        return new Alias(parts[1], parts[2])
    };

    Alias.fromDataServices = function (alias) {
        if (alias.__type !== 'alias')
            throw new Error('Unknown alias object: ' + JSON.stringify(alias));

        return new Alias('', alias.data.alias);
    };

    function AliasService() {
        this.isAlias = function (candidate) {
            return Alias.isAlias(candidate);
        };

        this.fromString = function (alias) {
            return Alias.fromString(alias)
        };

        this.fromDataServices = function (alias) {
            return Alias.fromDataServices(alias);
        }
    }

    angular.module('web').service('aliasService', [AliasService]);

})();