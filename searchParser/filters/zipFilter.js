module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _zip = require('../services/zipService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _zip, _filterTypes.zip);
    };

    return filter;
};