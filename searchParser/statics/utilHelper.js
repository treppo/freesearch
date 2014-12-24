module.exports = function () {
    'use strict';

    var isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var convertToInt = function (term) {
        return parseInt(term);
    };

    return {
        isNumber : isNumber,
        convertToInt : convertToInt
    };
};
