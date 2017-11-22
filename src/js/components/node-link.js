(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesNodeLink', {
            bindings: {
                ref: '<'
            },
            template: '<ng-switch on="$ctrl.ref.showAsLink">' +
                '<a ng-switch-when="true" ng-href="{{::$ctrl.ref.url}}" target="_blank">{{::$ctrl.ref.url}}</a>' +
                '<div ng-switch-default>{{::$ctrl.ref.url}}</div>' +
            '</ng-switch>'
        });
})();