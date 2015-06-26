module.exports = function () {
    'use strict';

    var combineFilters = function (filter) {
        var filters_pre = require('../registerFilters')({'pre': 1});
        var filters_post = require('../registerFilters')({'post': 1});

        filters_pre.push(filter);
        return filters_pre.concat(filters_post);
    };

    return {
        combineFilters: combineFilters
    };
};
