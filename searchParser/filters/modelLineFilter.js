'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _modelLines = require('../services/modelLineService')();

    var filter = function (searchTokens) {
        var  res = _findHelper.matchTokens(searchTokens, _modelLines, _filterTypes.modelLine); // find just modelLine
        return res;
    };

    return filter;
};