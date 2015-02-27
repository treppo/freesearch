module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _gearing = require('../services/gearingService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _gearing, _filterTypes.gearing);
    };

    return filter;
};