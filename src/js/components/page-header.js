(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesPageHeader', {
            bindings: {
                title: '@',
                subtitle: '<'
            },
            template: '<div class="page-header"><h1>{{$ctrl.title}}<small ng-if="$ctrl.subtitle.length > 0">' +
                '<i class="glyphicon glyphicon-menu-right"></i> {{$ctrl.subtitle}}</small></h1></div>'
        });
})();