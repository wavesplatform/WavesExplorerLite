(function () {
    'use strict';

    angular.module('web').
            filter('wavelets', function () {
                return function (input) {
                    var waves = input / 100000000;
                    return Number(waves.toFixed(8));
                };
            });
})();
