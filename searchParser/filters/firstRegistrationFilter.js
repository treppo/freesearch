'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;

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

        var maxYear = new Date().getFullYear();
        var minYear = 1990;

        var intTerm = _utilHelper.convertToInt(searchToken.term);
        if (!context.hasMarker) {
            if (_utilHelper.isNotInRange(intTerm, minYear, maxYear)) {
                return searchToken;
            }
        }

        context.found = true;

        searchToken.filter.type = _filterTypes.firstRegistration;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        processFilter: processFilter
    };
};