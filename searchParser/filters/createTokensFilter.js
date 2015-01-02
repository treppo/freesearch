module.exports = function () {
    'use strict';

    var filter = function (searchLine) {
        var tokens = [];

        if (searchLine) {
            tokens = searchLine.split(' ');
        }

        return tokens;
    };

    return filter;
};