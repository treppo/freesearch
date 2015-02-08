module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _utilHelper = require('../statics/utilHelper.js')();
    var _isUnknownFilter = require('../statics/filterTypes.js').isUnknownFilter;

    var _minDoors = 2;
    var _maxDoors = 7;

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (! _isUnknownFilter(searchToken.filter)) {
                return;
            }

            processFilter(searchToken, {});
        });

        return searchTokens;
    };

    var processFilter = function (searchToken, context) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);
        if (!context.hasMarker) {
            if (_utilHelper.isNotInRange(intTerm, _minDoors, _maxDoors)) {
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.door;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        processFilter: processFilter
    };
};