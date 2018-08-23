(function () {
    'use strict';

    function WavesProofsController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesProofs', {
            controller: WavesProofsController,
            bindings: {
                proofs: '<'
            },
            template: '{{$ctrl.proofs.join(", ")}}'
        });
})();