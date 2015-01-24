module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _utilHelper = require('../statics/utilHelper.js')();
    var _isUnknownFilter = require('../statics/filterTypes.js').isUnknownFilter;

    var _minPrevOwner = 1;
    var _maxPrevOwner = 3;

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
            if (intTerm < _minPrevOwner || intTerm > _maxPrevOwner) { // check range
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.prevOwner;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        assignFilter: assignFilter
    };
};