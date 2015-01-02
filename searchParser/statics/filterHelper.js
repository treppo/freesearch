module.exports = function () {
    'use strict';

    var _filterTypes = require('./filterTypes.js')();

    var isFilterDone = function (filter) {
        return filter.type !== _filterTypes.unknown;
    };

    var isMarkerFilter = function (filter) {
        return filter.type === _filterTypes.priceMarker ||
            filter.type === _filterTypes.powerMarker;
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
        return tokenLeft.filter.type === tokenRight.filter.type &&
            (tokenLeft.filter.valueFrom) &&
            (tokenRight.filter.valueFrom) && !(tokenLeft.filter.valueTo) && !(tokenRight.filter.valueTo);
    };

    var mergeRangeFilter = function (tokenLeft, tokenRight) {
        if (tokenLeft.filter.valueFrom <= tokenRight.filter.valueFrom) {
            tokenLeft.term = tokenLeft.term + ' - ' + tokenRight.term;

            tokenLeft.filter.valueTo = tokenRight.filter.valueFrom;
            tokenLeft.filter.termTo = tokenRight.filter.termFrom;
        }
        else {
            tokenLeft.term = tokenRight.term + ' - ' + tokenLeft.term;

            tokenLeft.filter.valueTo = tokenLeft.filter.valueFrom;
            tokenLeft.filter.termTo = tokenLeft.filter.termFrom;
            tokenLeft.filter.valueFrom = tokenRight.filter.valueFrom;
            tokenLeft.filter.termFrom = tokenRight.filter.termFrom;
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


    var lookBehind = function (searchTokens, fromIndex, fncToApply) {
        var s = searchTokens.reverse();

        var isNext = false;

        s.some(function (searchToken) {
            if (isNext) {
                return fncToApply(searchToken);
            }

            if (searchToken.index === fromIndex) {
                isNext = true;
            }

            return false;
        });

        if (isNext) {
            return s.reverse();
        }

        return searchTokens;
    };

    return {
        isFilterDone: isFilterDone,
        isMarkerFilter: isMarkerFilter,
        compareTermFilter: compareTermFilter,
        mergeTermFilter: mergeTermFilter,
        compareRangeFilter: compareRangeFilter,
        mergeRangeFilter: mergeRangeFilter,
        reduceIdenticalFilters: reduceIdenticalFilters,
        lookBehind: lookBehind
    };
};
