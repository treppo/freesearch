module.exports = function () {
    'use strict';

    var splitEndsWithSynonym = require('../services/synonymService').splitEndsWithSynonym;
    var _markers = require('../services/markerService')();

    var splitEndsBy = function (synKey) {
        return function (token) {
            return splitEndsWithSynonym(synKey, token);
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