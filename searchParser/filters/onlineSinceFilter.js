'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();

    var processFilter = function (searchToken, context) {
        var term = searchToken.term;

        if (context.markerType === 'yesterday') {
            term = 1;
        }
        if (context.markerType === 'daybeforeyesterday')  {
            term = 2;
        }

        if (!_utilHelper.isNumber(term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(term);
        if (context.markerType === 'week') {
            intTerm *= 7;
        }

        searchToken.filter.type = _filterTypes.onlineSince;
        searchToken.filter.termFrom = '' + intTerm;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return processFilter;
};