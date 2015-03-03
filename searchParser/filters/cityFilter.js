module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _city = require('../services/cityService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _city, _filterTypes.city);
    };

    return filter;
};