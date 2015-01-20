module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _bodyColorService = require('../services/bodyColorService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _bodyColorService, _filterTypes.bodyColor);
    };

    return filter;
};