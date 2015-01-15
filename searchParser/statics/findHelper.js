module.exports = function () {
    'use strict';

    var _synonymService = require('./../services/synonyms.js')();
    var _isUnknownFilter = require('../statics/filterTypes.js').isUnknownFilter;

    //  for each searchTerm from searchTerms ##### example: bla cross golf blub
    //
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
    var searchTokens = function (searchTokens, filters, filterType) {
        filters.forEach(function (filter) {
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
                var foundSynonym = _synonymService.isSynonymFor(filterTerm.term, searchToken.term);

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
                var foundSynonym = _synonymService.isSynonymFor(filterTerm.term, searchToken.term);
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

    return {
        searchTokens: searchTokens,
        isSynonymByFilter: isSynonymByFilter
    }
};