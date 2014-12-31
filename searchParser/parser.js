module.exports = function (filters) {
    'use strict';
    
    var _filterTypes = require('./statics/filterTypes.js')();
    var _symbolsToRemove = ['-', '+', ':', ';'];
    
    var parse = function(searchLine) {
        var normalizedSearchLine = normalizeSearchLine(searchLine);
        var searchTokens = createDefaultSearchTokens(normalizedSearchLine);
        searchTokens = runPipe(filters, searchTokens);

        return searchTokens;
    };
    
    var runPipe = function(filters, items) {
        var curItems = items;
        filters.forEach(function(filter) {
            curItems = filter(curItems);
        });
        
        return curItems;
    };

    var normalizeSearchLine = function(searchLine) {
        _symbolsToRemove.forEach(function(symbolToRemove) {
            searchLine = searchLine.replace(symbolToRemove, ' ');
        });

        searchLine = searchLine.replace( /\s\s+/g, ' ');
        searchLine = searchLine.trim();

        return searchLine;
    };

    var createDefaultSearchTokens = function (searchLine) {
        var tokens = [];

        if (searchLine) {
            tokens = searchLine.split(' ');
        }

        return tokens.map(function(token, index) {
            return {
                term : token,
                index : index,
                filter : {
                    type : _filterTypes.unknown
                }
            }
        });
    };

    return {
        parse : parse
    };
};