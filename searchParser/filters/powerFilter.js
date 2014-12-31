module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();

    var _powerMarker = ['ps', 'kw'];

    var filter = function(searchTokens) {
        searchTokens.forEach(function(searchToken) {
            if (searchToken.filter.type !== _filterTypes.unknown) {
                return;
            }
            var tuple = _utilHelper.containsMarker(searchToken.term, _powerMarker);
            var hasMarker = tuple.hasMarker;
            var term = tuple.term;
            var powerType = tuple.marker || 'ps';

            if (! _utilHelper.isNumber(term)) {
                return;
            }

            var intTerm = _utilHelper.convertToInt(term);

            // term must be is power due the contained power marker
            if (hasMarker) {
                assignFilter(searchToken, term, intTerm, powerType);
                return;
            }

            if (! _findHelper.isInSuitableRange(intTerm,  _filterTypes.power)) {
                return;
            }

            assignFilter(searchToken, term, intTerm, powerType);
        });

        return searchTokens;
    };

    var assignFilter = function (searchToken, term, intTerm, powerType) {
        searchToken.filter.type = _filterTypes.power;

        if (powerType === 'ps') { // recalculate to kw
            searchToken.filter.valueFrom = _utilHelper.convertFromPsToKw(intTerm);
            searchToken.filter.termFrom = '' + searchToken.filter.valueFrom;
        }
        else {
            searchToken.filter.valueFrom = intTerm;
            searchToken.filter.termFrom = term;
        }

    };

    return filter;
};
