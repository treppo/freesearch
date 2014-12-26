module.exports = function () {
    'use strict';

    var makeFilter = require('./filters/makeFilter.js')();
    var modelFilter = require('./filters/modelFilter.js')();
    var priceFilter = require('./filters/priceFilter.js')();
    var noneFilter = require('./filters/noneFilter.js')();

    var filters = [
        makeFilter,
        modelFilter,
        priceFilter,
        noneFilter
    ];

    return filters;
};
