(function() {
    'use strict';

    angular.module('web').filter('wavelets', function() {
        return function(input) {
            if (input == null) return null;
            var waves = input / 100000000;
            var str = addCommas(waves.toFixed(8));
		
            // remove trailing zeros
            var parts = str.split('.')
            parts[1] = trimZeros(parts[1]);
            parts[1] = parts[1].length == 0 ? "0" : parts[1]
            return parts[0] + "." + parts[1]
        };

        function trimZeros(str) {
            console.log(str);
            if (str.length == 0 || str[str.length - 1] != '0')
                return str;
            return trimZeros(str.substring(0, str.length - 1))
        }

        function addCommas(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    });
})();
