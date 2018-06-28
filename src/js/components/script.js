(function () {
    'use strict';

    function WavesScriptController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesScript', {
            controller: WavesScriptController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="word-break: break-word">{{$ctrl.text}}</span>'
        });
})();