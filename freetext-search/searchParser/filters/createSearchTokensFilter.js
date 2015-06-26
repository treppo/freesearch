'use strict';
module.exports = function () {
    var _config = require('../config/appConfig');
    var _createDefaultSearchToken = require('../statics/utilHelper')().createDefaultSearchToken;

    return function (tokens) {
        var searchTokens = tokens.map(_createDefaultSearchToken);

        if (searchTokens.length > _config.maxAllowedSearchTokens)
            return searchTokens.slice(0, _config.maxAllowedSearchTokens);
        return searchTokens;
    };
};