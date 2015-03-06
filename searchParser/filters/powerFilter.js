module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();

    var processFilter = function (searchToken, context) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var powerType = context.markerType || 'ps'; // default
        var intTerm = _utilHelper.convertToInt(searchToken.term);

        var kwTerm = 0;
        if (powerType === 'ps') {
            kwTerm = _utilHelper.convertFromPsToKw(intTerm);
        } else {
            kwTerm = intTerm;
        }

        searchToken.filter.type = _filterTypes.power;
        searchToken.filter.valueFrom = kwTerm;
        searchToken.filter.termFrom = '' + kwTerm;

        return searchToken;
    };

    return processFilter;
};
