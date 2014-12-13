module.exports = function () {
    'use strict';
    
    var _filterTypes = require('../filterTypes.js')();
    var _models = [
        { term : 'Golf', value : 2084 }, 
        { term : 'Cross Golf', value: 20315 }, 
        // { term : 'Mercedes', value: 47, syn : ['mers', 'merc'] },
        // { term : 'Volkswagen', value: 74, syn : ['vw'] },
    ];
    
    var filter = function(items) {
         var res = items.map(function(item, index, array) {
                if (item.filter.type === _filterTypes.unknown) {

                    var found = findModel(item.term);
                    if (found.length) {
                        item.filter.type = _filterTypes.model;
                        item.filter.term = found[0].term;
                        item.filter.value = found[0].value;
                    }
                    
                }
                return item;
            });
            
        return res;
    };

    var findModel = function(modelTerm) {
        var t = _models.filter(function(model) {
            var m = modelTerm.toLowerCase();
            if (m === model.term.toLowerCase()) {
                return model;
            }
            
            if (model.syn) {
                if (model.syn.some(function(syn) { return m === syn })) {
                    return model;
                }
            }
        });
        
        return t;
    };

    return filter;
};