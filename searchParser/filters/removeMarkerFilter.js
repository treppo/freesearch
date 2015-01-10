module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();

    var filter = function (searchTokens) {
        return searchTokens.filter(function (searchToken) {
            if (searchToken.filter.type !== _filterTypes.priceMarker &&
                searchToken.filter.type !== _filterTypes.powerMarker &&
                searchToken.filter.type !== _filterTypes.rangeMarker &&
                searchToken.filter.type !== _filterTypes.kmMarker
            ) {
                return searchToken;
            }
        });
    };

    return filter;
};