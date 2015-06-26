'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _filterHelper = require('../statics/filterHelper')();

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (searchToken.filter.type === _filterTypes.seat) {
                _filterHelper.transferRangeFilterToSingleValue(searchToken);
            }

            if (searchToken.filter.type === _filterTypes.door) {
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