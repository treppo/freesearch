'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _fuel = require('../services/fuelService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _fuel, _filterTypes.fuel);
    };
};