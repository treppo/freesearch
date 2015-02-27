module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;

    var _maxFirstRegistration = new Date().getFullYear();
    var _minFirstRegistration = 1910;

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
        if (_utilHelper.isNotInRange(intTerm, _minFirstRegistration, _maxFirstRegistration)) {
            return searchToken;
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