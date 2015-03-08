module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _fuel = require('../services/fuelService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _fuel, _filterTypes.fuel);
    };

    return filter;
};