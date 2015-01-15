module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _utilHelper = require('../statics/utilHelper.js')();
    var _isUnknownFilter = require('../statics/filterTypes.js').isUnknownFilter;

    var _maxMileage = 1000000;

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (! _isUnknownFilter(searchToken.filter)) {
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
            if (intTerm < 0 || intTerm > _maxMileage) { // check range
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.mileage;
        searchToken.filter.termTo = searchToken.term;
        searchToken.filter.valueTo = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        assignFilter: assignFilter
    };
};