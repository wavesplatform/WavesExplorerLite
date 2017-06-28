(function () {
    'use strict';

    angular.module('web').
            filter('waveaddr', function () {
                return function (input) {
                    if (input)
                        return '1W' + input;
                    return input;
                };
            });
})();