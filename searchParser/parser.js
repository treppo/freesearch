module.exports = function (filters) {
    'use strict';
    
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
            filters.forEach(function(element, index, array) {
            curItems = element(curItems);
        });
        
        return curItems;
    };
    
    var createSearchItems = function (tokens) {
        return tokens.map(function(token, index, array) {
            return {
                term : token,
                type : 'unknown',
                baseType : 'unknown'
            }
        });
    };
    
    return {
        parse : parse
    };
};