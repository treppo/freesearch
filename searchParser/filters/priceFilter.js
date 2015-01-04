module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

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
            return;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);

        if (!context.hasMarker) {
            if (!_findHelper.isInSuitableRange(intTerm, _filterTypes.price)) {
                return;
            }
        }

        searchToken.filter.type = _filterTypes.price;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;
    };

    return {
        filter: filter,
        assignFilter: assignFilter
    };
};