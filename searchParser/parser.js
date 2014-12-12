module.exports = function (filters) {
    'use strict';
    
    var _filterTypes = require('./filterTypes.js')();
    
    var parse = function(line) {
        if (! line.trim()) {
            return;
        }
        
        var tokens = line.split(' ');
        var items = createSearchItems(tokens);
    
        items = runPipe(filters, items)
        
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
                type : _filterTypes.unknown,
                baseType : 'unknown'
            }
        });
    };
    
    return {
        parse : parse
    };
};