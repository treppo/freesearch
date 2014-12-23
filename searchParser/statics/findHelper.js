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

            var searchTokensToReduceIndexes = [];
            var modelTerms = termToStruct(filter.term);

            searchTokens.forEach(function (searchToken, index) {
                if (searchToken.filter.type !== _filterTypes.unknown) {
                    return;
                }

                modelTerms.some(function (modelTerm) {
                    var foundSynonym = _synonymService.hasSynonymFor(modelTerm.term, searchToken.term);

                    if (foundSynonym) {
                        modelTerm.done = true;
                        modelTerms = getNotDoneTerms(modelTerms);

                        searchTokensToReduceIndexes.push(searchToken.index);
                    }

                    return foundSynonym;
                });
            });

            var found = getNotDoneTerms(modelTerms).length == 0;
            if (found) {
                searchTokens = reduceSearchTokensByFilter(searchTokens, searchTokensToReduceIndexes, {
                    value: filter.value,
                    term: filter.term,
                    type: filterType
                });
            }
        });

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

        return res;
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

    return {
        searchTokens : searchTokens
    }
};