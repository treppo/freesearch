module.exports = function () {
    'use strict';

    var _synonym = require('../services/synonymService.js')();
    var _markers = require('../services/markerService.js')();

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
        var t = splitByFunction(tokens, splitEndsBy(_markers.price[0].term));
            t = splitByFunction(t, splitEndsBy(_markers.power[0].term));
            t = splitByFunction(t, splitEndsBy(_markers.power[1].term));
            t = splitByFunction(t, splitEndsBy(_markers.km[0].term));

        return t;
    };

    return filter;
};