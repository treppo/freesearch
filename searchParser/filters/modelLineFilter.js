'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _modelLines = require('../services/modelLineService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _modelLines, _filterTypes.modelLine);
    };
};