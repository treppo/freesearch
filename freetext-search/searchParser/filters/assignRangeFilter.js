'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _filterHelper = require('../statics/filterHelper')();
    var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;
    var _isMarkerFilter = require('../statics/filterTypes').isMarkerFilter;
    var _isRangeMarker = require('../statics/filterTypes').isRangeMarker;

    var filter = function (searchTokens) {
        return searchTokens.reduce(function (accumulator, searchToken) {
            if (searchToken.filter.type === _filterTypes.rangeMarker) {
                accumulator = _filterHelper.iterateForward(
                    accumulator,
                    collectCondition(searchToken.index),
                    assignRange({
                        rangeType: searchToken.filter.value
                    })
                );
            }

            return accumulator;

        }, searchTokens);
    };

    var assignRange = function (context) {
        return function (searchToken) {
            if (_isUnknownFilter(searchToken)) {
                return searchToken;
            }

            if (context.rangeType === 'from') {
                if (searchToken.filter.termTo) {
                    searchToken.filter.termFrom = searchToken.filter.termTo;
                    searchToken.filter.termTo = undefined;
                }
                if (searchToken.filter.valueTo) {
                    searchToken.filter.valueFrom = searchToken.filter.valueTo;
                    searchToken.filter.valueTo = undefined;
                }

                searchToken.filter.assignedByRangeFilter = true;
            }

            if (context.rangeType === 'to') {
                if (searchToken.filter.termFrom) {
                    searchToken.filter.termTo = searchToken.filter.termFrom;
                    searchToken.filter.termFrom = undefined;
                }
                if (searchToken.filter.valueFrom) {
                    searchToken.filter.valueTo = searchToken.filter.valueFrom;
                    searchToken.filter.valueFrom = undefined;
                }

                searchToken.filter.assignedByRangeFilter = true;
            }

            return searchToken;
        };
    };

    //var collectConditionTTT = function (fromIndex) {
    //    var maxDeep = 1;
    //
    //    // iterate from fromIndex up to maxDeep
    //    return function(searchToken) {
    //        var bb = searchToken;
    //
    //       return _filterHelper.iterateToMaxDeep(maxDeep, fromIndex, function(searchToken) {
    //           if (_isMarkerFilter(searchToken)) {
    //               return false;
    //           }
    //
    //           if (_isRangeMarker(searchToken)) {
    //               return false;
    //           }
    //
    //           return true;
    //       })(searchToken);
    //    };
    //};

    var collectCondition = function (fromIndex) {
        var curDeep = 0;
        var maxDeep = 1;
        var isNext = false;

        // iterate from fromIndex up to maxDeep
        return function(searchToken) {
            if (searchToken.index === fromIndex) {
                isNext = true;
                return false;
            }

            if (!isNext) {
                return false;
            }

            if (_isMarkerFilter(searchToken)) {
                return false;
            }

            if (_isRangeMarker(searchToken)) {
                return false;
            }

            curDeep++;
            return maxDeep >= curDeep;
        };
    };

    return filter;
};