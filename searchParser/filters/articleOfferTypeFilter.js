module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _articleOfferType = require('../services/articleOfferTypeService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _articleOfferType, _filterTypes.articleOfferType);
    };

    return filter;
};