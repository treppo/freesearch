module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var _minMileage = 201; // avoid conflict with geo distance filter
    var _maxMileage = 1000000;

    var processFilter = function (searchToken, context) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);
        if (intTerm < _minMileage) { // avoid conflict with geo distance filter
            return searchToken;
        }

        if (!context.hasMarker) {
            if (intTerm > _maxMileage) { // check range
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.mileage;
        searchToken.filter.termTo = searchToken.term;
        searchToken.filter.valueTo = intTerm;

        return searchToken;
    };

    return processFilter;
};