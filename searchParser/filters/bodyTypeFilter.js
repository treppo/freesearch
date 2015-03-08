module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _bodyType = require('../services/bodyTypeService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _bodyType, _filterTypes.bodyType);
    };

    return filter;
};