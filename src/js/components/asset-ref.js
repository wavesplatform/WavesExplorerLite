(function () {
    'use strict';

    function WavesAssetRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.assetId) {
                if (!ctrl.text)
                    ctrl.text = changesObj.assetId.currentValue;
            }
        }
    }

    angular
        .module('web')
        .component('wavesAssetRef', {
            controller: WavesAssetRefController,
            bindings: {
                assetId: '<',
                maxLength: '<?',
                text: '<?'
            },
            template: '<div ng-if="$ctrl.assetId === null">WAVES</div>' +
                '<waves-transaction-ref ng-if="$ctrl.assetId !== null" txId="$ctrl.assetId" text="$ctrl.text"></waves-transaction-ref>'
        });
})();