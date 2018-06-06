(function () {
    'use strict';

    function WavesTransactionRawController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.tx) {
                if (!ctrl.text)
                    ctrl.text = JSON.stringify(changesObj.tx.currentValue, null, 4);
            }
        }
    }

    angular
        .module('web')
        .component('wavesTransactionRaw', {
            controller: WavesTransactionRawController,
            bindings: {
                tx: '<'
            },
            template: '<pre>{{$ctrl.text}}</pre>'
        });
})();