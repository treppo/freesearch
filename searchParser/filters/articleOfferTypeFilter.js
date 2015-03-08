module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _articleOfferType = require('../services/articleOfferTypeService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _articleOfferType, _filterTypes.articleOfferType);
    };

    return filter;
};