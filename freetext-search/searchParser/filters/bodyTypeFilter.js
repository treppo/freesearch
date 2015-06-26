'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _bodyType = require('../services/bodyTypeService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _bodyType, _filterTypes.bodyType);
    };
};