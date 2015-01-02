module.exports = function () {
    'use strict';

    var normalizeSearchLineFilter = require('./filters/normalizeSearchLineFilter.js')();
    var createTokensFilter = require('./filters/createTokensFilter.js')();
    var markerFilter = require('./filters/markerFilter.js')();
    var makeFilter = require('./filters/makeFilter.js')();
    var modelFilter = require('./filters/modelFilter.js')();
    var priceFilter = require('./filters/priceFilter.js')();
    var powerFilter = require('./filters/powerFilter.js')();
    var removeMarkerFilter = require('./filters/removeMarkerFilter.js')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    // order is greedy
    var filters = [
        normalizeSearchLineFilter,
        createTokensFilter,
        markerFilter,
        makeFilter,
        modelFilter,
        powerFilter,
        priceFilter,
        removeMarkerFilter,
        reduceIdenticalFilter,
        noneFilter,
    ];

    return filters;
};
