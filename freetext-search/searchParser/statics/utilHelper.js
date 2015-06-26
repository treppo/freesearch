'use strict';
module.exports = function () {
    var _unknownFilter = require('./filterTypes').filterTypes.unknown;

    var isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var convertToInt = function (val) {
        if (typeof val === 'string'){
            val = val.replace('.', '').replace(',', '');
        }

        return parseInt(val);
    };

    var convertFromPsToKw = function (ps) {
        return parseInt(0.745699872 * ps);
    };

    var convertFromKwToPs = function (kw) {
        return parseInt(kw / 0.745699872);
    };

    var isNotInRange = function (val, min, max) {
        if (val < min || val > max) {
            return true;
        }
        return false;
    };

    var transformToObject = function(arr) {
        var t = {};
        arr.forEach(function(elem) {
            t[elem.term.toLowerCase()] = elem.value;
        });

        return t;
    };

    var isQuickTestMode = function () {
        return process.argv.some(function (val) {
            return val === 'quick_test'
        });
    };

    var tokenize = function (input) {
        var tokens = [];
        if (input) {
            tokens = input.split(/[\s,]+/);
        }

        return tokens;
    };

    var createServiceTerms = function (arr) {
        return arr.map(function(elem) {
            return {
                term: elem.term,
                value: elem.value,
                tokens: tokenize(elem.term)
            };
        });
    };

    var createDefaultSearchToken  = function (token, index) {
        return {
            term: token,
            index: index,
            filter: {
                type: _unknownFilter
            }
        }
    };

    return {
        isNumber: isNumber,
        convertToInt: convertToInt,
        convertFromPsToKw: convertFromPsToKw,
        convertFromKwToPs: convertFromKwToPs,
        isNotInRange: isNotInRange,
        transformToObject: transformToObject,
        isQuickTestMode: isQuickTestMode,
        tokenize: tokenize,
        createServiceTerms: createServiceTerms,
        createDefaultSearchToken: createDefaultSearchToken
    };
};
