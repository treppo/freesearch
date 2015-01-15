module.exports = function () {
    'use strict';

    //var _filterTypes = require('./filterTypes.js').filterTypes;

    //var isUnknownFilter = function (filter) {
    //    return filter.type === _filterTypes.unknown;
    //};
    //
    //var isMarkerFilter = function (filter) {
    //    return filter.type === _filterTypes.priceMarker ||
    //        filter.type === _filterTypes.powerMarker ||
    //        filter.type === _filterTypes.kmMarker ||
    //        filter.type === _filterTypes.firstRegistrationMarker;
    //};
    //
    //var isRangeMarker = function (filter) {
    //    return filter.type === _filterTypes.rangeMarker;
    //};

    var compareTermFilter = function (tokenLeft, tokenRight) {
        return tokenLeft.filter.type === tokenRight.filter.type &&
            (tokenLeft.filter.value) &&
            tokenLeft.filter.value === tokenRight.filter.value;
    };

    var mergeTermFilter = function (tokenLeft, tokenRight) {
        tokenLeft.term = tokenLeft.term + ' ' + tokenRight.term;
    };

    var compareRangeFilter = function (tokenLeft, tokenRight) {
        if (tokenLeft.filter.type !== tokenRight.filter.type) {
            return false;
        }
        // if one of the range tokens has already from and to values, don't merge the tokens
        if ((tokenLeft.filter.valueFrom && tokenLeft.filter.valueTo) ||
            (tokenRight.filter.valueFrom && tokenRight.filter.valueTo)
        ) {
            return false;
        }

        // merge tokens where only one part is filled
        return (
            (tokenLeft.filter.valueFrom || tokenLeft.filter.valueTo) &&
            (tokenRight.filter.valueFrom || tokenRight.filter.valueTo)
        );
    };

    var mergeRangeFilter = function (tokenLeft, tokenRight) {
        var val1 = tokenLeft.filter.valueFrom || tokenLeft.filter.valueTo;
        var val2 = tokenRight.filter.valueFrom || tokenRight.filter.valueTo;

        var term1 = tokenLeft.filter.termFrom || tokenLeft.filter.termTo;
        var term2 = tokenRight.filter.termFrom || tokenRight.filter.termTo;

        if (val2 > val1) {
            tokenLeft.term = tokenLeft.term + ' - ' + tokenRight.term;

            tokenLeft.filter.valueFrom = val1;
            tokenLeft.filter.termFrom = term1;

            tokenLeft.filter.valueTo = val2;
            tokenLeft.filter.termTo = term2;
        }
        else {
            tokenLeft.term = tokenRight.term + ' - ' + tokenLeft.term;

            tokenLeft.filter.valueFrom = val2;
            tokenLeft.filter.termFrom = term2;

            tokenLeft.filter.valueTo = val1;
            tokenLeft.filter.termTo = term1;
        }
    };

    var reduceIdenticalFilters = function (searchTokens, fncCompare, fncMerge) {
        return searchTokens.reduce(function (accumulator, searchToken) {
            // are there already accumulated items identical with the current one
            var merged = accumulator.some(function (accToken) {
                var isIdentical = fncCompare(accToken, searchToken);
                if (isIdentical) {
                    fncMerge(accToken, searchToken);
                }
                return isIdentical;
            });

            if (merged) {
                return accumulator;
            }

            accumulator.push(searchToken);

            return accumulator;
        }, []);
    };

    var mergeSearchTokens = function (mergeTo, mergeFrom) {
        return mergeTo.map(function (mergeToItem) {
            var m = mergeFrom.filter(function (mergeFromItem) {
                return (mergeFromItem.index === mergeToItem.index);
            });

            if (m.length) {
                return m[0];
            }

            return mergeToItem;
        });
    };

    var iterateToMaxDeep = function (maxDeep, fromIndex, fncCollect) {
        var curDeep = 0;
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

            if (! fncCollect(searchToken)) {
                return false;
            }

            curDeep++;
            return maxDeep >= curDeep;
        };
    };

    var iterateForward = function (searchTokens, fncFilter, fncApply) {
        var f = searchTokens.filter(fncFilter);
        var a = f.map(fncApply);
        return mergeSearchTokens(searchTokens, a);
    };

    var iterateBackward = function (searchTokens, fncFilter, fncApply) {
        var f = searchTokens.reverse().filter(fncFilter);
        var a = f.map(fncApply);
        return mergeSearchTokens(searchTokens.reverse(), a);
    };

    return {
        //isUnknownFilter: isUnknownFilter,
        //isMarkerFilter: isMarkerFilter,
        //isRangeMarker: isRangeMarker,
        compareTermFilter: compareTermFilter,
        mergeTermFilter: mergeTermFilter,
        compareRangeFilter: compareRangeFilter,
        mergeRangeFilter: mergeRangeFilter,
        reduceIdenticalFilters: reduceIdenticalFilters,
        iterateToMaxDeep: iterateToMaxDeep,
        iterateForward : iterateForward,
        iterateBackward : iterateBackward
    };
};
