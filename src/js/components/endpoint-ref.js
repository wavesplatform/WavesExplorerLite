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

        ctrl.$onInit = function () {
            console.log(ctrl);

            if (ctrl.endpoint.search(ADDRESS_PREFIX) == 0) {
                ctrl.address = ctrl.endpoint.replace(ADDRESS_PREFIX, '');
            }
            if (Alias.isAlias(ctrl.endpoint)) {
                ctrl.alias = ctrl.endpoint;
            }
            else {
                ctrl.address = ctrl.endpoint;
            }

            ctrl.isAlias = ctrl.alias ? true : false;
            ctrl.isAddress = ctrl.address ? true : false;

            ctrl.text = ctrl.isAlias ? Alias.fromString(ctrl.alias).text : ctrl.address;
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
                '{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>' +
            '<a ng-if="$ctrl.isAlias" class="mono" ui-sref="alias-details({alias:$ctrl.alias})" title="{{$ctrl.alias}}">' +
                '{{$ctrl.text|limitTo:$ctrl.maxLength}}{{$ctrl.text.length > $ctrl.maxLength ? "&hellip;" : ""}}' +
            '</a>'
        });
})();