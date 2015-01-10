module.exports = function () {
    'use strict';

    var combineFilters = function (filter) {
        var filters_pre = require('../registeredFilters.js')('pre');
        var filters_post = require('../registeredFilters.js')('post');

        filters_pre.push(filter);
        return filters_pre.concat(filters_post);
    };

    return {
        combineFilters: combineFilters
    };
};
