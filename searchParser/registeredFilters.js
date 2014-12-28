module.exports = function () {
    'use strict';

    var makeFilter = require('./filters/makeFilter.js')();
    var modelFilter = require('./filters/modelFilter.js')();
    var priceFilter = require('./filters/priceFilter.js')();
    var powerFilter = require('./filters/powerFilter.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    var filters = [
        makeFilter,
        modelFilter,
        priceFilter,
        powerFilter,
        noneFilter
    ];

    return filters;
};
