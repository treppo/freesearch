module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

    var _maxPriceInEuro = 1000000;

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (! _filterHelper.isUnknownFilter(searchToken.filter)) {
                return;
            }

            assignFilter(searchToken, {});
        });

        return searchTokens;
    };

    var assignFilter = function (searchToken, context) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);

        if (!context.hasMarker) {
            if (!context.hasMarker) {
                if (intTerm < 0 || intTerm > _maxPriceInEuro) { // check range
                    return searchToken;
                }
            }
        }

        searchToken.filter.type = _filterTypes.price;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        assignFilter: assignFilter
    };
};