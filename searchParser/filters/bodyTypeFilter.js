module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _bodyType = require('../services/bodyTypeService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _bodyType, _filterTypes.bodyType);
    };

    return filter;
};