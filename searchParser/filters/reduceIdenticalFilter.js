'use strict';
module.exports = function () {
    var _filterHelper = require('../statics/filterHelper')();
    var _isMarkerFilter = require('../statics/filterTypes').isMarkerFilter;
    var _isRangeMarker = require('../statics/filterTypes').isRangeMarker;

    var filter = function (searchTokens) {
        searchTokens = _filterHelper.reduceIdenticalFilters(searchTokens, fncCompareWithoutMarkerFilter(_filterHelper.compareTermFilter), _filterHelper.mergeTermFilter);
        searchTokens = _filterHelper.reduceIdenticalFilters(searchTokens, fncCompareWithoutMarkerFilter(_filterHelper.compareRangeFilter), _filterHelper.mergeRangeFilter);

        return searchTokens;
    };


    var fncCompareWithoutMarkerFilter = function (fncCompare) {

        return function (tokenLeft, tokenRight) {
            if (_isRangeMarker(tokenLeft.filter) || _isMarkerFilter(tokenLeft.filter)) {
                return false;
            }
            return fncCompare(tokenLeft, tokenRight);
        }
    };

    return filter;
};