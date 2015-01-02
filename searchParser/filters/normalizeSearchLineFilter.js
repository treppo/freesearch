module.exports = function () {
    'use strict';

    var _symbolsToRemove = ['-', '+', ':', ';'];

    var filter = function (searchLine) {
        _symbolsToRemove.forEach(function (symbolToRemove) {
            searchLine = searchLine.replace(symbolToRemove, ' ');
        });

        searchLine = searchLine.replace(/\s\s+/g, ' ');
        searchLine = searchLine.trim();

        return searchLine;
    };

    return filter;
};