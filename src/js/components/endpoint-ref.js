(function () {
    'use strict';

    var ADDRESS_PREFIX = 'address:';


    function WavesEndpointRefController(aliasService) {
        var ctrl = this;

        function adjustBindings() {
            if (!ctrl.endpoint)
                return;

            if (ctrl.endpoint.indexOf(ADDRESS_PREFIX) === 0) {
                ctrl.address = ctrl.endpoint.replace(ADDRESS_PREFIX, '');
            }
            else if (aliasService.isAlias(ctrl.endpoint)) {
                ctrl.alias = aliasService.fromString(ctrl.alias).text;
            }
            else {
                ctrl.address = ctrl.endpoint;
            }

            ctrl.isAlias = ctrl.alias ? true : false;
            ctrl.isAddress = ctrl.address ? true : false;
        }

        ctrl.$onChanges = function (changesObj) {
            if (changesObj.endpoint) {
                if (changesObj.endpoint.currentValue) {
                    ctrl.endpoint = changesObj.endpoint.currentValue;

                    adjustBindings();
                }
            }
        };

        ctrl.$onInit = function () {
            adjustBindings();
        };
    }

    angular
        .module('web')
        .component('wavesEndpointRef', {
            controller: ['aliasService', WavesEndpointRefController],
            bindings: {
                endpoint: '<',
                maxLength: '<?'
            },
            template: '<a ng-if="$ctrl.isAddress" class="mono" ui-sref="address-details({address:$ctrl.address})" title="{{$ctrl.address}}">' +
                '{{$ctrl.address|limitTo:$ctrl.maxLength}}{{$ctrl.address.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>' +
            '<a ng-if="$ctrl.isAlias" class="mono" ui-sref="alias-details({alias:$ctrl.alias})" title="{{$ctrl.alias}}">' +
                '{{$ctrl.alias|limitTo:$ctrl.maxLength}}{{$ctrl.alias.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>'
        });
})();