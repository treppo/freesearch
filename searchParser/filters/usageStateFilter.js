module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _usageStateService = require('../services/usageStateService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _usageStateService, _filterTypes.usageState);
    };

    return filter;
};