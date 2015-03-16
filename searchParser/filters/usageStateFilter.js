'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _usageStateService = require('../services/usageStateService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _usageStateService, _filterTypes.usageState);
    };

    return filter;
};