module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

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
            return;
        }

        var powerType = context.powerType || 'ps'; // default
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
            if (!_findHelper.isInSuitableRange(psTerm, _filterTypes.power)) {
                return;
            }
        }
        searchToken.filter.type = _filterTypes.power;
        searchToken.filter.valueFrom = kwTerm;
        searchToken.filter.termFrom = '' + kwTerm;
    };

    return {
        filter: filter,
        assignFilter: assignFilter
    };
};
