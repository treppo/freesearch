'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _city = require('../services/cityService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _city, _filterTypes.city);
    };
};