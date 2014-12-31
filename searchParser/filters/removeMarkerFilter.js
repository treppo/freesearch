module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();

    var filter = function(searchTokens) {

        searchTokens.forEach(function(searchToken, index, array) {
            if (searchToken.filter.type === _filterTypes.priceMarker ||
                searchToken.filter.type === _filterTypes.powerMarker ||
                searchToken.filter.type === _filterTypes.rangeMarker
            ) {
                array.splice(index, 1);
                return;
            }
        });

        return searchTokens;
    };

    return filter;
};