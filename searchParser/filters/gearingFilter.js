'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _gearing = require('../services/gearingService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _gearing, _filterTypes.gearing);
    };
};