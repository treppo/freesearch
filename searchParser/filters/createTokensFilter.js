module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();

    var filter = function (searchLine) {
        var tokens = [];

        if (searchLine) {
            tokens = searchLine.split(' ');
        }

        return tokens.map(function (token, index) {
            return {
                term: token,
                index: index,
                filter: {
                    type: _filterTypes.unknown
                }
            }
        });
    };

    return filter;
};