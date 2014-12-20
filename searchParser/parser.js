module.exports = function (filters) {
    'use strict';
    
    var _filterTypes = require('./statics/filterTypes.js')();
    
    var parse = function(line) {
        if (! line.trim()) {
            return;
        }
        
        var tokens = line.split(' ');
        var items = createSearchItems(tokens);
    
        items = runPipe(filters, items)
        
        items = reduceIdenticalFilters(items);
        
        return items;
    }
    
    var runPipe = function(filters, items) {
        var curItems = items;
        filters.forEach(function(filter, index, array) {
            curItems = filter(curItems);
        });
        
        return curItems;
    };
    
    var createSearchItems = function (tokens) {
        return tokens.map(function(token, index, array) {
            return {
                term : token,
                index : index,
                filter : {
                    type : _filterTypes.unknown,
                    value : 'unknown'
                }
            }
        });
    };
    
    var reduceIdenticalFilters = function (items) {
        var t = items.reduce(function(accumulator, item, index, array) {
            // dont merge unknowns
            if (item.filter.type !== _filterTypes.unknown) {
                // are there already accumulated items identical with the current one
                var merged = accumulator.some(function(accItem, index, array) {
                    var t = accItem.filter.type === item.filter.type && accItem.filter.value === item.filter.value;
                    // yes, merge two identical items
                    if (t) {
                        accItem.term = accItem.term + ' ' +  item.term;
                    }
                    return t;
                });
                
                if (merged) {
                    return accumulator;
                }
            }
            
            accumulator.push(item);
            return accumulator;
        }, []);
        
        return t;
    };
    
    return {
        parse : parse
    };
};