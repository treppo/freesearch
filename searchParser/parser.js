module.exports = function (filters) {
    'use strict';

    var parse = function (searchLine) {
        var searchTokens = runPipe(filters, searchLine);

        return searchTokens;
    };

    var runPipe = function (filters, items) {
        var curItems = items;
        filters.forEach(function (filter) {
            curItems = filter(curItems);
        });

        return curItems;
    };

    return {
        parse: parse
    };
};