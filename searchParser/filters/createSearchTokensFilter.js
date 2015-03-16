'use strict';
module.exports = function () {
    var _config = require('../config/appConfig');
    var _filterTypes = require('../statics/filterTypes').filterTypes;

    var filter = function (tokens) {
        var searchTokens = tokens.map(function (token, index) {
            return {
                term: token,
                index: index,
                filter: {
                    type: _filterTypes.unknown
                }
            }
        });

        if (searchTokens.length > _config.maxAllowedSearchTokens)
            return searchTokens.slice(0, _config.maxAllowedSearchTokens);
        return searchTokens;
    };

    return filter;
};