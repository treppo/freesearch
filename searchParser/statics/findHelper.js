module.exports = function () {
    'use strict';

    var _synonymService = require('./../services/synonyms.js')();
    var _filterTypes = require('./filterTypes.js')();

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
            if (searchToken.filter.type !== _filterTypes.unknown) {
                return;
            }
            if (index < startIndex) {
                return;
            }

            filterTerms.some(function (filterTerm) {
                var foundSynonym = _synonymService.hasSynonymFor(filterTerm.term, searchToken.term);

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
        var res = searchTokens.reduce(function(accumulator, searchToken, index, searchTokens) {

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

        },[]);

        return {
            searchTokens : res,
            mergeToPosition : mergeToPosition
        };
    };

    var getNotDoneTerms = function (terms) {
        return terms.filter(function(term){
            return term.done === false;
        });
    };

    var termToStruct = function (term) {
        var t = term.split(' ');
        return t.map(function(item){
            return {
                term : item,
                done : false
            };
        });
    };

    var _ranges = {
        minPrice : 0,
        maxPrice : 1000000,
        minPower : 0,
        maxPower : 500
    };

    var isInSuitableRange = function (intTerm, filterType) {
        if (filterType === _filterTypes.price) {
            return intTerm >= _ranges.minPrice && intTerm <= _ranges.maxPrice;
        }

        if (filterType === _filterTypes.power) {
            return intTerm >= _ranges.minPower && intTerm <= _ranges.maxPower;
        }

        return true;
    };

    return {
        searchTokens : searchTokens,
        isInSuitableRange : isInSuitableRange,
        ranges : _ranges // expose due testing
    }
};