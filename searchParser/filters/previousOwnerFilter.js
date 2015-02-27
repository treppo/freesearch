module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;

    var _minPrevOwner = 1;
    var _maxPrevOwner = 3;

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
            if (_utilHelper.isNotInRange(intTerm, _minPrevOwner, _maxPrevOwner)) {
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.prevOwner;
        searchToken.filter.termTo = searchToken.term;
        searchToken.filter.valueTo = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        processFilter: processFilter
    };
};