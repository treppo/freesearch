module.exports = function () {
    'use strict';

    var _filterTypes = require('../filterTypes.js')();
    var _makes = [
        { term : 'Audi', value : 9 }, 
        { term : 'BMW', value: 13 }, 
        { term : 'Mercedes', value: 47, syn : ['mers', 'merc'] },
        { term : 'Volkswagen', value: 74, syn : ['vw'] },
    ];
    
    var filter = function(items) {
         var res = items.map(function(item, index, array) {
                if (item.filter.type === _filterTypes.unknown) {
                
                    var foundMakes = findMake(item.term);
                    if (foundMakes.length) {
                        item.filter.type = _filterTypes.make;
                        item.filter.term = foundMakes[0].term;
                        item.filter.value = foundMakes[0].value;
                    }
                    
                }
                return item;
            });
            
        return res;
    };

    var findMake = function(makeTerm) {
        var t = _makes.filter(function(make) {
            var m = makeTerm.toLowerCase();
            if (m === make.term.toLowerCase()) {
                return make;
            }
            
            if (make.syn) {
                if (make.syn.some(function(syn) { return m === syn })) {
                    return make;
                }
            }
        });
        
        return t;
    };
    
    return filter;
};
