(function () {
    'use strict';

    var ADDRESS_PREFIX = "address:";

    function WavesEndpointRefController() {
        var ctrl = this;

        ctrl.$onInit = function () {
            console.log(ctrl);

            if (ctrl.endpoint.search(ADDRESS_PREFIX) == 0) {
                ctrl.address = ctrl.endpoint.replace(ADDRESS_PREFIX, '');
            }
            else {
                ctrl.address = ctrl.endpoint;
            }

            //TODO: detect aliases and use a different template there
        };
    }

    angular
        .module('web')
        .component('wavesEndpointRef', {
            controller: WavesEndpointRefController,
            bindings: {
                endpoint: '<',
                maxLength: '<?'
            },
            template: '<a class="mono" ui-sref="address-details({address:$ctrl.address})" title="{{$ctrl.address}}">' +
                '{{$ctrl.address|limitTo:$ctrl.maxLength}}{{$ctrl.address.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>'
        });
})();