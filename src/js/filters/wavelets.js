(function() {
    'use strict';

    angular.module('web').filter('wavelets', function() {
        return function(input) {
            if (input == null) return null;
            var waves = input / 100000000;
            var str = waves.toLocaleString("en-US", {
                minimumFractionDigits: 8
            });
            var parts = str.split(".")
            if (parseInt(parts[1]) == 0) parts[1] = "0"
            else parts[1] = trimZeros(parts[1])
            return parts[0] + "." + parts[1]
        };

        function trimZeros(str) {
            if (str.length == 0 || str[str.length - 1] != "0")
                return str;
            return trimZeros(str.substring(0, str.length - 1))
        }
    });
})();
