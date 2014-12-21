module.exports = function () {
    'use strict';
    
    var _filterTypes = require('../statics/filterTypes.js')();
    var _synService = require('../statics/synonyms.js')();
    var _parseHelper = require('../statics/parseHelper.js')();
        
    var _models = [
        { term : 'Golf', value : 2084 }, 
        //{ term : 'Cross Golf', value: 20315 },
    ];

    var filter = function(searchTokens) {

        _models.forEach(function(model) {

            var modelTerms = _parseHelper.termToStruct(model.term);

            var foundedSearchIndexes = [];

            searchTokens.forEach(function(searchToken){

                modelTerms.some(function(modelTerm){
                    var found = _synService.hasSynonymeFor(modelTerm.term, searchToken.term);

                    if (found) {
                        modelTerm.done = true;
                        modelTerms = _parseHelper.getNotDoneTerms(modelTerms);

                        foundedSearchIndexes.push(searchToken.index);
                    }

                    return found;
                });
            });


            var remained = _parseHelper.getNotDoneTerms(modelTerms);
            if (remained.length == 0) {
                searchTokens = reduceModelFilter(searchTokens, model, foundedSearchIndexes);
            }
        });

        return searchTokens;
    };

    function reduceModelFilter(searchTokens, model, foundedSearchIndexes) {

        var mergeToPosition = -1;
        var res = searchTokens.reduce(function(accumulator, searchToken, index, searchTokens) {

            if (searchToken.index in foundedSearchIndexes) {

                if (mergeToPosition < 0) {
                    mergeToPosition = index;

                    searchToken.filter.type = _filterTypes.model;
                    searchToken.filter.value = model.value;
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
    }


     //  for each searchTerm from Search # bla cross golf blub
     //
     //    for each not done modelTerm from modelTerms # Cross Golf
     //        get synonyms for the modelTerm
     //
     //        is searchTerm in the synonyms
     //            yes, save index of searchToken, mark modelTerm as done, break, next searchToken
     //            no, do nothing, iterate to next ModelTerm
     //
     // are there not done term from ModelTerm ?
     //     yes, model does not match
     //         return original Search back
     //     no, model match
     //         merge all marked items, give the new Search back.


    //var filter = function(items) {
    //
    //    var unknowns = _parseHelper.getUnknownItems(items);
    //    var searchItems = unknowns.map(function (item) {
    //        item.term =  item.term.toLowerCase();
    //        return item;
    //    });
    //
    //    var res = items;
    //    _models.forEach(function(model) {
    //        var terms = _parseHelper.termToStruct(model.term);
    //        var syns = [];
    //        terms.forEach(function(term) {
    //            if (_synonyms[term]){
    //                syns = _synonyms[term];
    //            }
    //        });
    //
    //        var found = syns.some(function(syn){
    //            return searchItems.some(function (searchTerm) {
    //                var f = syn === searchTerm.term;
    //                if (f) {
    //                    searchTerm.filter.type = _filterTypes.model;
    //                    searchTerm.filter.term = model.term;
    //                    searchTerm.filter.value = model.value;
    //                }
    //                return f;
    //            });
    //        });
    //
    //        if (found){
    //            res = items.map(function(item){
    //                searchItems.forEach(function(searchItem) {
    //                    if (searchItem.index === item.index){
    //                        item = searchItem;
    //                    }
    //                });
    //
    //                return item;
    //            });
    //        }
    //    });
    //    return res;

            //var found = _parseHelper.findAll(searchTerm, terms)
        //});



        //var res = items.map(function (item) {
        //    if (item.filter.type === _filterTypes.unknown) {
        //
        //            var found = findModel(item.term);
        //            if (found.length) {
        //                item.filter.type = _filterTypes.model;
        //                item.filter.term = found[0].term;
        //                item.filter.value = found[0].value;
        //            }
        //
        //        }
        //        return item;
        //    });
        //return res;
        //return items;
    //};



    return filter;
};