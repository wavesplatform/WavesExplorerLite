(function () {
    'use strict';

    function WavesNodeLinkController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesNodeLink', {
            controller: WavesNodeLinkController,
            bindings: {
                ref: '<'
            },
            template: '<ng-switch on="$ctrl.ref.showAsLink">' +
                '<a ng-switch-when="true" ng-href="$ctrl.ref.url" target="_blank">{{::$ctrl.ref.url}}</a>' +
                '<ng-switch-default>{{::$ctrl.ref.url}}</ng-switch-default>' +
            '</ng-switch>'
        });
})();