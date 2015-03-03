module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _zip = require('../services/zipService')();

    var filter = function (searchTokens) {
        searchTokens.filter(function (searchToken) {
            return searchToken.filter.type == _filterTypes.unknown;
        }).forEach(function (searchToken) {
            if (_zip[searchToken.term]) {
                searchToken.filter.type = _filterTypes.zip;
                searchToken.filter.term = searchToken.term;
                searchToken.filter.value = _zip[searchToken.term];
            }
        });

        return searchTokens;
    };

    return filter;
};