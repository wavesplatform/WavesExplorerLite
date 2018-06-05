(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 32;

    function WavesDataKeyController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('wavesDataKey', {
            controller: WavesDataKeyController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}'
        });
})();