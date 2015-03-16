'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var _minMileage = 201; // avoid conflict with geo radius filter

    var processFilter = function (searchToken) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);
        if (intTerm < _minMileage) { // avoid conflict with geo radius filter
            return searchToken;
        }

        searchToken.filter.type = _filterTypes.mileage;
        searchToken.filter.termTo = searchToken.term;
        searchToken.filter.valueTo = intTerm;

        return searchToken;
    };

    return processFilter;
};