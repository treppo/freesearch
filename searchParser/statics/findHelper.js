'use strict';

var _isUnknownSearchToken = require('../statics/filterTypes').isUnknownSearchToken;
module.exports = function () {

    /*
     unknownSearchTokens: [ vw merc bmw ]
     serviceTerms:
     [
         audi
         bmw
         merc
         vw
     ]

     unknownSearchTokens: [ audi 100 bmw x5 ]
     serviceTerms:
     [
         100
         100
         100
         x5
         x5
     ]
     */

    var equals = function(serviceTerm, searchToken) {
        return (serviceTerm.toLowerCase() === searchToken.synonym.toLowerCase());
    };

    var interceptAll = function (serviceTerms, searchTokens) {
        // its all weird, i'm not happy :(
        if (serviceTerms.length === 1 && equals(serviceTerms[0], searchTokens[0]))
            return [searchTokens[0].index];

        if (serviceTerms.length > searchTokens.length)
            return [];

        if (! serviceTerms.some(function(serviceTerm){
                return equals(serviceTerm, searchTokens[0]);
            }))
            return [];

        var intercepts = [];
        var intercepted = serviceTerms.every(function (serviceTerm) {
            var foundOne = searchTokens.some(function (searchToken) {
                if (equals(serviceTerm, searchToken)) {
                    intercepts.push(searchToken.index);
                    return true;
                }
            });

            return foundOne;
        });

        if (intercepted)
            return intercepts.sort(); // asc

        return [];
    };

    var mergeSearchTokenItem = function (l, r) {
        l.term += ' ' + r.term;
    };

    var mergeIntercepted = function (searchTokens, interceptedIndexes) {
        var mergeIndex = interceptedIndexes[0];
        var mergeSearchToken;

        return searchTokens.reduce(function (acc, searchToken) {
            if (interceptedIndexes.indexOf(searchToken.index) > -1) {
                if (mergeIndex === searchToken.index) { // don't merge with itself
                    mergeSearchToken = searchToken;
                    acc.push(searchToken);
                }
                else {
                    mergeSearchTokenItem(mergeSearchToken, searchToken);
                }
            }
            else {
                acc.push(searchToken);
            }

            return acc;
        }, []);
    };

    var matchTokens = function (searchTokens, service, filterType, ctx) {
        var curUnknownIndex = -1;
        while (true) {
            var unknownSearchTokens = searchTokens.filter(_isUnknownSearchToken).filter(function (searchToken) {
                return (searchToken.index > curUnknownIndex);
            });
            if (unknownSearchTokens.length === 0)
                break;

            curUnknownIndex = unknownSearchTokens[0].index;

            var unknownSearchToken = unknownSearchTokens[0];
            var serviceTerms = service;
            if (ctx && ctx.fncServiceCondition) {
                serviceTerms = ctx.fncServiceCondition(service, unknownSearchToken, searchTokens);
            }

            serviceTerms.some(function (serviceTerm) {
                // first try a sample match
                var interceptedIndexes = interceptAll([serviceTerm.term], unknownSearchTokens);

                // then with splitting
                if (interceptedIndexes.length === 0)
                    interceptedIndexes = interceptAll(serviceTerm.tokens, unknownSearchTokens);

                if (interceptedIndexes.length > 0) {

                    if (interceptedIndexes.length > 1) {
                        searchTokens = mergeIntercepted(searchTokens, interceptedIndexes);
                    }

                    // assign filter data to first searchToken
                    searchTokens.some(function (searchToken) {
                        if (searchToken.index === interceptedIndexes[0]) {
                            searchToken.filter.type = filterType;
                            searchToken.filter.value = serviceTerm.value;
                            searchToken.filter.term = serviceTerm.term;
                            return true;
                        }
                    });

                    if (ctx)
                        ctx.found = true;

                    return true;
                }
            });
        }

        return searchTokens;
    };

    return {
        matchTokens: matchTokens
    }
};