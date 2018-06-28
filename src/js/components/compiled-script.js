(function () {
    'use strict';

    var DEFAULT_MAX_LENGTH = 110;

    function WavesCompiledScriptController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            ctrl.maxLength = ctrl.maxLength | DEFAULT_MAX_LENGTH;
        };
    }

    angular
        .module('web')
        .component('wavesCompiledScript', {
            controller: WavesCompiledScriptController,
            bindings: {
                maxLength: '<?',
                text: '<?'
            },
            template: '<span style="line-height: 30px">{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}</span>' +
                '<waves-copy-button text="$ctrl.text"></waves-copy-button>'
        });
})();