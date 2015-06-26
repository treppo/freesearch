'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _articleOfferType = require('../services/articleOfferTypeService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _articleOfferType, _filterTypes.articleOfferType);
    };
};