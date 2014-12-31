module.exports = function () {
    'use strict';

    var _utilHelper = require('../statics/utilHelper.js')();

    var filter = function(searchTokens) {
        searchTokens = _utilHelper.reduceIdenticalFilters(searchTokens, _utilHelper.compareTermFilter, _utilHelper.mergeTermFilter);
        searchTokens = _utilHelper.reduceIdenticalFilters(searchTokens, _utilHelper.compareRangeFilter, _utilHelper.mergeRangeFilter);

        return searchTokens;
    };

    return filter;
};