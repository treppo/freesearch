module.exports = function () {
    'use strict';
    
    var _filterTypes = require('../statics/filterTypes.js')();
    var _synonyms = require('../statics/synonyms.js')();
    var _parseHelper = require('../statics/parseHelper.js')();
        
    var _models = [
        { term : 'Golf', value : 2084 }, 
        //{ term : 'Cross Golf', value: 20315 },
    ];
    
    var filter = function(items) {

        var unknowns = _parseHelper.getUnknownItems(items);
        var searchItems = unknowns.map(function (item) {
            item.term =  item.term.toLowerCase();
            return item;
        });

        var res = items;
        _models.forEach(function(model) {
            var terms = _parseHelper.termToArray(model.term);
            var syns = [];
            terms.forEach(function(term) {
                if (_synonyms[term]){
                    syns = _synonyms[term];
                }
            });

            var found = syns.some(function(syn){
                return searchItems.some(function (searchTerm) {
                    var f = syn === searchTerm.term;
                    if (f) {
                        searchTerm.filter.type = _filterTypes.model;
                        searchTerm.filter.term = model.term;
                        searchTerm.filter.value = model.value;
                    }
                    return f;
                });
            });

            if (found){
                res = items.map(function(item){
                    searchItems.forEach(function(searchItem) {
                        if (searchItem.index === item.index){
                            item = searchItem;
                        }
                    });

                    return item;
                });
            }
        });
        return res;

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
    };

    var findModel = function(searchTerm) {
        var t = _models.filter(function(model) {
            var terms = _parseHelper.termToArray(model.term);
            //var found = _parseHelper.findAll(searchTerm, terms)

            
        });
        
        return t;
    };

    return filter;
};