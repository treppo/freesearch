'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _bodyColor  = require('../services/bodyColorService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _bodyColor, _filterTypes.bodyColor);
    };

    return filter;
};