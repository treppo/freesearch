module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _colorEffect  = require('../services/colorEffectService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _colorEffect, _filterTypes.colorEffect);
    };

    return filter;
};