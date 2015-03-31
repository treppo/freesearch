'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _zip = require('../services/zipService')();
    var isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;

    return function (searchTokens) {
        searchTokens.filter(isUnknownFilter)
            .forEach(function (searchToken) {
                if (_zip[searchToken.term]) {
                    searchToken.filter.type = _filterTypes.zip;
                    searchToken.filter.term = searchToken.term;
                    searchToken.filter.value = _zip[searchToken.term];
                }
            });

        return searchTokens;
    };
};