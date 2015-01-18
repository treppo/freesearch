module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _fuel = require('../services/fuelService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _fuel, _filterTypes.fuel);
    };

    return filter;
};