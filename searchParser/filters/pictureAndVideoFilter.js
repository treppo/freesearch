module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _pictureVideoService  = require('../services/pictureAndVideoService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _pictureVideoService, _filterTypes.pictureAndVideo);
    };

    return filter;
};