module.exports = function () {
    'use strict';

    var _filterHelper = require('../statics/filterHelper')();

    var filter = function (searchTokens) {
        searchTokens = _filterHelper.reduceIdenticalFilters(searchTokens, _filterHelper.compareTermFilter, _filterHelper.mergeTermFilter);
        searchTokens = _filterHelper.reduceIdenticalFilters(searchTokens, _filterHelper.compareRangeFilter, _filterHelper.mergeRangeFilter);

        return searchTokens;
    };

    return filter;
};