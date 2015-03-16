'use strict';
module.exports = function () {
    var filter = function (searchLine) {
        var tokens = [];

        if (searchLine) {
            tokens = searchLine.split(' ');
        }

        return tokens;
    };

    return filter;
};