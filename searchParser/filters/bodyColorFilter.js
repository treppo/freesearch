module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _bodyColor  = require('../services/bodyColorService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _bodyColor, _filterTypes.bodyColor);
    };

    return filter;
};