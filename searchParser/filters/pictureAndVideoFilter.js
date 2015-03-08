module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _pictureVideoService  = require('../services/pictureAndVideoService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _pictureVideoService, _filterTypes.pictureAndVideo);
    };

    return filter;
};