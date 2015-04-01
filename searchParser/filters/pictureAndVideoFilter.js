'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _pictureVideoService  = require('../services/pictureAndVideoService')();

    return function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _pictureVideoService, _filterTypes.pictureAndVideo);
    };
};