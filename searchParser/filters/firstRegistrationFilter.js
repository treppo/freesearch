module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

    var _maxFirstRegistration = new Date().getFullYear();
    var _minFirstRegistration = 1910;

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

        if (intTerm <_minFirstRegistration || intTerm > _maxFirstRegistration) { // check range
            return searchToken;
        }

        context.found = true;

        searchToken.filter.type = _filterTypes.firstRegistration;
        searchToken.filter.termTo = searchToken.term;
        searchToken.filter.valueTo = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        assignFilter: assignFilter
    };
};