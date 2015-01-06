module.exports = function () {
    'use strict';

    var _filterTypes = require('./filterTypes.js')();

    var isUnknownFilter = function (filter) {
        return filter.type === _filterTypes.unknown;
    };

    var isMarkerFilter = function (filter) {
        return filter.type === _filterTypes.priceMarker ||
            filter.type === _filterTypes.powerMarker;
    };

    var isRangeMarker = function (filter) {
        return filter.type === _filterTypes.rangeMarker;
    };

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

    var createAssignFilterFnc = function (fncToBreakIteration, fncToApply, context) {
        var assignFilterFnc = function (searchToken) {
            if (fncToBreakIteration(searchToken)) {
                return true;
            }
            fncToApply(searchToken, context);

            return false;
        };

        return assignFilterFnc;
    };

    var lookBehind = function (searchTokens, fromIndex, fncToApply) {
        return lookAhead(searchTokens.reverse(), fromIndex, fncToApply).reverse();
    };

    var lookAhead  = function (searchTokens, fromIndex, fncToApply) {
        var isNext = false;
        searchTokens.some(function (searchToken) {
            if (isNext) {
                return fncToApply(searchToken);
            }

            if (searchToken.index === fromIndex) {
                isNext = true;
            }

            return false;
        });

        return searchTokens;
    };

    return {
        isUnknownFilter: isUnknownFilter,
        isMarkerFilter: isMarkerFilter,
        isRangeMarker: isRangeMarker,
        compareTermFilter: compareTermFilter,
        mergeTermFilter: mergeTermFilter,
        compareRangeFilter: compareRangeFilter,
        mergeRangeFilter: mergeRangeFilter,
        reduceIdenticalFilters: reduceIdenticalFilters,
        createAssignFilterFnc: createAssignFilterFnc,
        lookBehind: lookBehind,
        lookAhead: lookAhead
    };
};
