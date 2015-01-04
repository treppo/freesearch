module.exports = function () {
    'use strict';

    var isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var convertToInt = function (term) {
        return parseInt(term);
    };

    var convertFromPsToKw = function (ps) {
        return parseInt(0.745699872 * ps);
    };

    var convertFromKwToPs = function (kw) {
        return parseInt(kw / 0.745699872);
    };

    return {
        isNumber: isNumber,
        convertToInt: convertToInt,
        convertFromPsToKw: convertFromPsToKw,
        convertFromKwToPs: convertFromKwToPs
    };
};
