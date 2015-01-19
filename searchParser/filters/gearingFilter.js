module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _gearing = require('../services/gearingService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _gearing, _filterTypes.gearing);
    };

    return filter;
};