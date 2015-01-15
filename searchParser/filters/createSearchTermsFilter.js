module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;

    var filter = function (tokens) {
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