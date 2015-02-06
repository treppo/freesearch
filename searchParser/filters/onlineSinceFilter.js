module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _utilHelper = require('../statics/utilHelper.js')();
    var _isUnknownFilter = require('../statics/filterTypes.js').isUnknownFilter;

    var _minOnlineSince = 1;
    var _maxOnlineSince = 14;

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

        if (!context.hasMarker) {
            if (_utilHelper.isNotInRange(intTerm, _minOnlineSince, _maxOnlineSince)) {
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.onlineSince;
        searchToken.filter.termFrom = '' + intTerm;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return {
        filter: filter,
        processFilter: processFilter
    };
};