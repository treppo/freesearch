'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _colorEffect  = require('../services/colorEffectService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _colorEffect, _filterTypes.colorEffect);
    };
};