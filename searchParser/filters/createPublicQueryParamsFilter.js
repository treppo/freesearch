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
        var query = '';

        _getFiltersByType(searchTokens, _filterTypes.make)
        .forEach(function (make) {
            query += make.filter.value + ',';
        });

        if (query) {
            query = '&make=' + query;
            query = removeLastComma(query);
        }

        return query;
    };

    var removeLastComma = function(str) {
        var t = str.length - 1;
        if (str.charAt(t) == ',') {
            return str.substring(0, t);
        }
        return str;
    };

    return filter;
};