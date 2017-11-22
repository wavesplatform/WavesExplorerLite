(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesTransactionTable', {
            transclude: true,
            bindings: {
                title: '@'
            },
            template: '<div class="widget-box widget-color-blue2">' +
                '<div class="widget-header widget-header-small widget-header-flat">' +
                    '<h5 class="widget-title"><i class="glyphicon glyphicon-th-list"></i> {{$ctrl.title}}</h5>' +
                '</div>' +
                '<div class="widget-body">' +
                    '<div class="widget-main no-padding" ng-transclude></div>' +
                '</div>' +
            '</div>'
        });
})();