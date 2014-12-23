module.exports = function (filters) {
    'use strict';
    
    var _filterTypes = require('./statics/filterTypes.js')();
    
    var parse = function(searchLine) {
        var items = createSearchTokens(searchLine);
    
        items = runPipe(filters, items);
        
        items = reduceIdenticalFilters(items);
        
        return items;
    };
    
    var runPipe = function(filters, items) {
        var curItems = items;
        filters.forEach(function(filter) {
            curItems = filter(curItems);
        });
        
        return curItems;
    };
    
    var createSearchTokens = function (searchLine) {
        var tokens = [];

        var symbolsToRemove = ['-', '+', ':', ';'];
        symbolsToRemove.forEach(function(sym) {
            searchLine = searchLine.replace(sym, ' ');
        });

        searchLine = searchLine.replace( /\s\s+/g, ' ');
        searchLine = searchLine.trim();

        if (searchLine) {
            tokens = searchLine.split(' ');
        }

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
    
    var reduceIdenticalFilters = function (earchTokens) {
        var t = earchTokens.reduce(function(accumulator, earchToken, index, array) {
            // don't merge unknowns
            if (earchToken.filter.type !== _filterTypes.unknown) {
                // are there already accumulated items identical with the current one
                var merged = accumulator.some(function(accItem, index, array) {
                    var t = accItem.filter.type === earchToken.filter.type && accItem.filter.value === earchToken.filter.value;
                    // yes, merge two identical items
                    if (t) {
                        accItem.term = accItem.term + ' ' +  earchToken.term;
                    }
                    return t;
                });
                
                if (merged) {
                    return accumulator;
                }
            }
            
            accumulator.push(earchToken);
            return accumulator;
        }, []);
        
        return t;
    };
    
    return {
        parse : parse
    };
};