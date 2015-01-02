module.exports = function () {
    'use strict';

    var isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    var convertToInt = function (term) {
        return parseInt(term);
    };

    var convertFromPsToKw = function (ps) {
        return  parseInt(0.745699872  * ps);
    };

    var compareTermFilter = function(tokenLeft, tokenRight) {
        return tokenLeft.filter.type === tokenRight.filter.type &&
            (tokenLeft.filter.value) &&
            tokenLeft.filter.value === tokenRight.filter.value;
    };

    var mergeTermFilter = function(tokenLeft, tokenRight) {
        tokenLeft.term = tokenLeft.term + ' ' +  tokenRight.term;
    };

    var compareRangeFilter = function(tokenLeft, tokenRight) {
        return tokenLeft.filter.type === tokenRight.filter.type &&
            (tokenLeft.filter.valueFrom) &&
            (tokenRight.filter.valueFrom) &&
            !(tokenLeft.filter.valueTo) &&
            !(tokenRight.filter.valueTo);
    };

    var mergeRangeFilter = function(tokenLeft, tokenRight) {
        if (tokenLeft.filter.valueFrom <= tokenRight.filter.valueFrom) {
            tokenLeft.term = tokenLeft.term + ' - ' +  tokenRight.term;

            tokenLeft.filter.valueTo = tokenRight.filter.valueFrom;
            tokenLeft.filter.termTo = tokenRight.filter.termFrom;
        }
        else {
            tokenLeft.term = tokenRight.term + ' - ' +  tokenLeft.term;

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



    var lookaHead = function (searchTokens, fromIndex, fncToApply, deep) {
        var res = {};
        var currDeep = 1;

        searchTokens.some(function(searchToken) {
            if (searchToken.index <= fromIndex){
                return false;
            }

            if (currDeep > deep) {
                return true;
            }
            currDeep++;

            var t = fncToApply(searchToken);
            if (t.found){
                res = t;
                return true;
            }
            return false;
        });

        return res;
    };

    return {
        isNumber : isNumber,
        convertToInt : convertToInt,
        convertFromPsToKw : convertFromPsToKw,
        compareTermFilter : compareTermFilter,
        mergeTermFilter : mergeTermFilter,
        compareRangeFilter: compareRangeFilter,
        mergeRangeFilter : mergeRangeFilter,
        reduceIdenticalFilters : reduceIdenticalFilters,
        lookaHead : lookaHead
    };
};
