'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _colorEffect  = require('../services/colorEffectService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _colorEffect, _filterTypes.colorEffect);
    };

    return filter;
};