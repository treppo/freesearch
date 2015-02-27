module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;

    var _maxPowerInPs = 500; // in PS

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

        var powerType = context.markerType || 'ps'; // default
        var intTerm = _utilHelper.convertToInt(searchToken.term);

        var kwTerm = 0;
        var psTerm = 0;
        if (powerType === 'ps') {
            kwTerm = _utilHelper.convertFromPsToKw(intTerm);
            psTerm = intTerm;
        } else {
            kwTerm = intTerm;
            psTerm = _utilHelper.convertFromKwToPs(intTerm);
        }

        if (!context.hasMarker) {
            if (_utilHelper.isNotInRange(psTerm, 0, _maxPowerInPs)) {
                return searchToken;
            }
        }

        searchToken.filter.type = _filterTypes.power;
        searchToken.filter.valueFrom = kwTerm;
        searchToken.filter.termFrom = '' + kwTerm;

        return searchToken;
    };

    return {
        filter: filter,
        processFilter: processFilter
    };
};
