module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _makes = require('../services/makeService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _makes, _filterTypes.make);
    };

    return filter;
};