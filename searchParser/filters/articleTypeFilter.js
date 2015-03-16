'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _articleType = require('../services/articleTypeService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _articleType, _filterTypes.articleType);
    };

    return filter;
};