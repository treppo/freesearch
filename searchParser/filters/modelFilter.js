module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _models = require('../services/models.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _models, _filterTypes.model);
    };

    return filter;
};