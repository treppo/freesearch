'use strict';
module.exports = function () {
    var _symbolsToRemove = ['-', '+', ';'];

    var filter = function (searchLine) {

        if (! searchLine) {
            return searchLine;
        }

        _symbolsToRemove.forEach(function (symbolToRemove) {
            searchLine = searchLine.replace(symbolToRemove, ' ');
        });

        searchLine = searchLine.replace(/\s\s+/g, ' ');
        searchLine = searchLine.trim();

        return searchLine;
    };

    return filter;
};