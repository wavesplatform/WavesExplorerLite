(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesBoolean', {
            bindings: {
                value: '<'
            },
            template: '<i class="glyphicon glyphicon-ok bigger-110 green" ng-if="$ctrl.value"></i>' +
                '<i class="glyphicon glyphicon-remove bigger-110 red" ng-if="!$ctrl.value"></i>'
        });
})();