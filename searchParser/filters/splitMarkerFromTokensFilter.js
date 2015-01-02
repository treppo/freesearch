module.exports = function () {
    'use strict';

    var _synonym = require('../services/synonyms.js')();

    var splitEndsBy = function (synKey) {
        return function (token) {
            return _synonym.splitEndsWithSynonym(synKey, token);
        }
    };

    var splitByFunction = function (tokens, fnc) {
        return tokens.reduce(function (accumulator, token) {
            var tuple = fnc(token);
            if (tuple.found) {
                accumulator = accumulator.concat(tuple.terms);
            }
            else {
                accumulator.push(token);
            }

            return accumulator;
        }, []);
    };

    var filter = function (tokens) {
        var t = splitByFunction(tokens, splitEndsBy('Euro'));
            t = splitByFunction(t, splitEndsBy('Ps'));
            t = splitByFunction(t, splitEndsBy('Kw'));

        return t;
    };

    return filter;
};