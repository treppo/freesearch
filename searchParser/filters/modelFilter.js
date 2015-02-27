module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _models = require('../services/modelService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _models, _filterTypes.model);
    };

    return filter;
};