module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _filterHelper = require('../statics/filterHelper.js')();

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (searchToken.filter.type === _filterTypes.seat) {
                _filterHelper.transferRangeFilterToSingleValue(searchToken);
            }

            if (searchToken.filter.type === _filterTypes.prevOwner) {
                _filterHelper.transferRangeFilterToSingleValue(searchToken);
            }
        });

        return searchTokens;
    };

    return filter;
};