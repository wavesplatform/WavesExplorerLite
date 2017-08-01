(function () {
    'use strict';

    function WavesBlockRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesBlockRef', {
            controller: WavesBlockRefController,
            bindings: {
                height: '<'
            },
            template: '<a ui-sref="block-details({height:$ctrl.height})">{{$ctrl.height}}</a>'
        });
})();