(function () {
    'use strict';

    var ADDRESS_PREFIX = 'address:';
    var ALIAS_PREFIX = 'alias';

    function Alias(networkCode, base58EncodedText) {
        var encodedText = base58EncodedText.trim();
        this.networkCode = networkCode;

        var chars = Base58.decode(encodedText);
        this.text = converters.byteArrayToString(chars);

        this.toString = function () {
            return ALIAS_PREFIX + ':' + this.networkCode + ':' + encodedText;
        }
    }

    Alias.isAlias = function (candidate) {
        return candidate.trim().search(ALIAS_PREFIX) == 0;
    };

    Alias.fromString = function (candidate) {
        var parts = candidate.split(':');
        if (parts.length != 3)
            throw new Error('Too few elements in alias: ' + candidate);

        if (parts[0] !== ALIAS_PREFIX)
            throw new Error('Unexpected alias prefix: ' + candidate);

        return new Alias(parts[1], parts[2])
    };

    function WavesEndpointRefController() {
        var ctrl = this;

        function adjustBindings() {
            if (!ctrl.endpoint)
                return;

            if (ctrl.endpoint.indexOf(ADDRESS_PREFIX) === 0) {
                ctrl.address = ctrl.endpoint.replace(ADDRESS_PREFIX, '');
            }
            else if (Alias.isAlias(ctrl.endpoint)) {
                ctrl.alias = Alias.fromString(ctrl.alias).text;
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
            controller: WavesEndpointRefController,
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