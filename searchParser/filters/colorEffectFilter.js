module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _colorEffect  = require('../services/colorEffectService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _colorEffect, _filterTypes.colorEffect);
    };

    return filter;
};