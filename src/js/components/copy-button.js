(function () {
    'use strict';

    function WavesCopyButtonController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesCopyButton', {
            controller: WavesCopyButtonController,
            bindings: {
                text: '<?'
            },
            template: '<button class="btn btn-info btn-white btn-xs pull-right no-border" title="Copy to clipboard" ' +
                        'ngclipboard data-clipboard-text="{{$ctrl.text}}">' +
                    '<i class="icon-only glyphicon glyphicon-copy bigger-150"></i>' +
                '</button>'
        });
})();