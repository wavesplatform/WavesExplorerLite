(function () {
    'use strict';

    angular
        .module('web')
        .component('wavesBlockRef', {
            bindings: {
                height: '<'
            },
            template: '<a ui-sref="block-details({height:$ctrl.height})">{{$ctrl.height}}</a>'
        });
})();