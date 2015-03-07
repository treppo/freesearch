'use strict';
var _isSynonymFor = require('./../services/synonymService').isSynonymFor;
var _getSynonymFor = require('./../services/synonymService').isSynonymFor;
var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;
var _isUnknownSearchToken = require('../statics/filterTypes').isUnknownSearchToken;

module.exports = function () {


    //  for each searchTerm from searchTerms ##### example: bla cross golf blub
    //    for each not done filterTerm from filterTerms ##### example: Cross Golf
    //        get synonyms for the filterTerm
    //
    //        is searchTerm in the synonyms
    //            yes, save index of searchToken, mark filterTerm as done, break, next searchToken
    //            no, do nothing, iterate to next filterTerm
    //
    // are there not done filterTerm from filterTerms ?
    //     yes, filter does not match
    //         return original searchTerms back
    //     no, filter match
    //         merge all noticed searchTerms, return the new searchTerms back.
    var searchTokens = function (searchTokens, filters, filterType, fncCondition) {
        var f = filters;

        if (fncCondition) {
            f = filters.filter(fncCondition);
        }

        f.forEach(function (filter) {
            searchTokens = searchTokenForFilter(searchTokens, filter, filterType, 0);
        });

        return searchTokens;
    };

    var searchTokenForFilter = function (searchTokens, filter, filterType, startIndex) {
        var searchTokensToReduceIndexes = [];
        var filterTerms = termToStruct(filter.term);

        searchTokens.forEach(function (searchToken, index) {
            if (! _isUnknownFilter(searchToken.filter)) {
                return;
            }
            if (index < startIndex) {
                return;
            }

            filterTerms.some(function (filterTerm) {
                var foundSynonym = _isSynonymFor(filterTerm.term, searchToken.term);

                if (foundSynonym) {
                    filterTerm.done = true;
                    filterTerms = getNotDoneTerms(filterTerms);

                    searchTokensToReduceIndexes.push(searchToken.index);
                }

                return foundSynonym;
            });
        });

        var found = getNotDoneTerms(filterTerms).length == 0;
        if (found) {
            var reduced = reduceSearchTokensByFilter(searchTokens, searchTokensToReduceIndexes, {
                value: filter.value,
                term: filter.term,
                type: filterType
            });

            searchTokens = reduced.searchTokens;
            if (reduced.mergeToPosition > -1) {
                searchTokens = searchTokenForFilter(searchTokens, filter, filterType, reduced.mergeToPosition);
            }
        }

        return searchTokens;
    };

    var reduceSearchTokensByFilter = function (searchTokens, foundedSearchIndexes, filter) {
        var mergeToPosition = -1;
        var res = searchTokens.reduce(function (accumulator, searchToken, index, searchTokens) {

            if (foundedSearchIndexes.indexOf(searchToken.index) > -1) {

                if (mergeToPosition < 0) {
                    mergeToPosition = index;

                    searchToken.filter.type = filter.type;
                    searchToken.filter.value = filter.value;
                    searchToken.filter.term = filter.term;
                    accumulator.push(searchToken);
                }
                else {
                    searchTokens[mergeToPosition].term += " " + searchToken.term;
                }
            }
            else {
                accumulator.push(searchToken);
            }

            return accumulator;

        }, []);

        return {
            searchTokens: res,
            mergeToPosition: mergeToPosition
        };
    };

    var getNotDoneTerms = function (terms) {
        return terms.filter(function (term) {
            return term.done === false;
        });
    };

    var termToStruct = function (term) {
        var t = term.split(' ');
        return t.map(function (item) {
            return {
                term: item,
                done: false
            };
        });
    };

    var isSynonymByFilter = function (filterTerms) {

        var res = {
            found: false
        };

        return function (searchToken) {

            filterTerms.some(function (filterTerm) {
                var foundSynonym = _isSynonymFor(filterTerm.term, searchToken.term);
                if (foundSynonym) {
                    res.found = true;
                    res.filterTerm = filterTerm;

                    return true;
                }
                return false;
            });

            return res;
        };
    };

   /////////////////////////////////////////////////////////////////

    var interceptAll = function (serviceTerms, searchTokens, fncConditional) {
        if (serviceTerms.length > searchTokens.length)
            return [];

        var intercepts = [];
        var prev;

        var intercepted = serviceTerms.every(function (serviceTerm) {
            var foundOne = searchTokens.some(function (searchToken) {
                // (serviceTerm.term.toLowerCase() === searchToken.synonym.toLowerCase())
                if (serviceTerm === searchToken.synonym) {
                    if (fncConditional(prev, searchToken)) {
                        prev = searchToken;
                        intercepts.push(searchToken.index);
                        return true;
                    }
                    return false;
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
                if (mergeIndex === searchToken.index) { // don't merge with it self
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

    var matchTokens = function (searchTokens, service, filterType, distance, fncServiceCondition) {
        var curUnknownIndex = -1;
        while (true) {
            var unknownSearchTokens = searchTokens.filter(_isUnknownSearchToken).filter(function (searchToken) {
                return (searchToken.index > curUnknownIndex);
            });
            if (unknownSearchTokens.length <= 0)
                break;

            curUnknownIndex = unknownSearchTokens[0].index;

            var unknownSearchToken = unknownSearchTokens[0];
            var serviceTerms = service;
            if (fncServiceCondition) {
                serviceTerms = fncServiceCondition(service, unknownSearchToken, searchTokens);
            }

            serviceTerms.some(function (serviceTerm) {
                var serviceTokens = serviceTerm.term.split(' ');

                var interceptedIndexes = interceptAll(serviceTokens, unknownSearchTokens, function () { return true; });
                if (interceptedIndexes.length > 0) {

                    if (interceptedIndexes.length > 1) {
                        searchTokens = mergeIntercepted(searchTokens, interceptedIndexes);
                    }

                    searchTokens.map(function (searchToken) {
                        if (searchToken.index === interceptedIndexes[0]) {
                            searchToken.filter.type = filterType;
                            searchToken.filter.value = serviceTerm.value;
                            searchToken.filter.term = serviceTerm.term;
                        }

                        return searchToken;
                    });

                    return true;
                }
            });
        }

        return searchTokens;
    };

    return {
        searchTokens: searchTokens,
        isSynonymByFilter: isSynonymByFilter,
        matchTokens: matchTokens
    }
};