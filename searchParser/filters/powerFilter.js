module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();

    var _powerMarker = ['ps', 'kw'];

    var filter = function(searchTokens) {
        searchTokens.forEach(function(searchToken, index, array) {
            if (searchToken.filter.type !== _filterTypes.unknown) {
                return;
            }
            var tuple = _utilHelper.removeMarker(searchToken.term, _powerMarker);
            var hasMarker = tuple.hasMarker;
            var term = tuple.term;
            var powerType = tuple.marker || 'ps';

            //// term as power marker. Remove it
            if (hasMarker && term.length === 0) {
                array.splice(index, 1);
                return;
            }

            if (! _utilHelper.isNumber(term)) {
                return;
            }

            var intTerm = _utilHelper.convertToInt(term);

            // term must be is power due the power marker
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
            searchToken.filter.valueFrom = convertFromPsToKw(intTerm);
            searchToken.filter.termFrom = '' + searchToken.filter.valueFrom;
        }
        else {
            searchToken.filter.valueFrom = intTerm;
            searchToken.filter.termFrom = term;
        }

    };

    var convertFromPsToKw = function (ps) {
      return  parseInt(0.745699872  * ps);
    };

    return filter;
};
