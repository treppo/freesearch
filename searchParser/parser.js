'use strict';
module.exports = function (filters) {

    var parse = function (searchLine) {
        return filters.reduce(function (accumulator, filter) {
            return filter(accumulator);
        }, searchLine);
    };

    return {
        parse: parse
    };
};