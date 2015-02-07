module.exports = function (context) {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _getFiltersByType = require('../statics/filterTypes').getFiltersByType;

    var filter = function (searchTokens) {
        var query = '';
        query += processMake(searchTokens);

        if (context) {
            context.publicQueryParams = query;
        }

        return searchTokens;
    };

    var processMake = function(searchTokens) {
        var i = 0;
        var query = '';

        _getFiltersByType(searchTokens, _filterTypes.make)
        .forEach(function(make) {
            if (i < 3) { // only three makes are allowed
                query += '&mmvmk' + i + '=' + make.filter.value;
                i++;
            }
        });

        return query;
    };

    return filter;
};