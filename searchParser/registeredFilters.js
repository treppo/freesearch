module.exports = function () {
    'use strict';

    var markerFilter = require('./filters/markerFilter.js')();
    var makeFilter = require('./filters/makeFilter.js')();
    var modelFilter = require('./filters/modelFilter.js')();
    var priceFilter = require('./filters/priceFilter.js')();
    var powerFilter = require('./filters/powerFilter.js')();
    var removeMarkerFilter = require('./filters/removeMarkerFilter.js')();
    var identicalFilterReducer = require('./filters/identicalFilterReducer.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    // order is greedy
    var filters = [
        markerFilter,
        makeFilter,
        modelFilter,
        powerFilter,
        priceFilter,
        removeMarkerFilter,
        identicalFilterReducer,
        noneFilter,
    ];

    return filters;
};
