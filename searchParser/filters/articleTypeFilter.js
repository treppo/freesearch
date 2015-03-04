module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _articleType = require('../services/articleTypeService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _articleType, _filterTypes.articleType);
    };

    return filter;
};