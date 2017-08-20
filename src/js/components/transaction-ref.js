(function () {
    'use strict';

    function WavesTransactionRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
        };
    }

    angular
        .module('web')
        .component('wavesTransactionRef', {
            controller: WavesTransactionRefController,
            bindings: {
                txId: '<',
                maxLength: '<?'
            },
            template: '<a class="mono" ui-sref="tx-details({id:$ctrl.txId})" >' +
                '{{$ctrl.txId|limitTo:$ctrl.maxLength}}{{$ctrl.txId.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>'
        });
})();