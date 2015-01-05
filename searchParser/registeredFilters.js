module.exports = function () {
    'use strict';

    var normalizeSearchLineFilter = require('./filters/cleanUpSearchLineFilter.js')();
    var createTokensFilter = require('./filters/createTokensFilter.js')();
    var splitMarkerFromTokensFilter = require('./filters/splitMarkerFromTokensFilter.js')();
    var createSearchTermsFilter = require('./filters/createSearchTermsFilter.js')();

    var createMarkerFilter = require('./filters/createMarkerFilter.js')();
    var heuristicFilter = require('./filters/heuristicFilter.js')();
    var makeFilter = require('./filters/makeFilter.js')();
    var modelFilter = require('./filters/modelFilter.js')();
    var priceFilter = require('./filters/priceFilter.js')();
    var powerFilter = require('./filters/powerFilter.js')();
    var removeMarkerFilter = require('./filters/removeMarkerFilter.js')();
    var rangeMarkerFilter = require('./filters/rangeMarkerFilter.js')();
    var reduceIdenticalFilter = require('./filters/reduceIdenticalFilter.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    return [
        normalizeSearchLineFilter,
        createTokensFilter,
        splitMarkerFromTokensFilter,
        createSearchTermsFilter,
        createMarkerFilter,

        heuristicFilter, // power, price etc. with entity markers

        makeFilter,
        modelFilter,
        powerFilter.filter,
        priceFilter.filter,

        rangeMarkerFilter, // work out range markers (from to)
        removeMarkerFilter,
        reduceIdenticalFilter,
        noneFilter,
    ];
};
