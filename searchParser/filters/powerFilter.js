module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();
    var _markers = require('../services/markers.js')();

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (searchToken.filter.type !== _filterTypes.unknown) {
                return;
            }

            var term = searchToken.term;
            var powerType = 'ps';

            //var tuple = _findHelper.containsSynonymByFilter(_markers.power)(searchToken);
            //var hasMarker = tuple.found;
            //if (tuple.found) {
            //    hasMarker = true;
            //    term = tuple.term;
            //    powerType = tuple.filterTerm.value;
            //}

            if (!_utilHelper.isNumber(term)) {
                return;
            }
            var intTerm = _utilHelper.convertToInt(term);

            //if (!hasMarker) {
            //    tuple = _utilHelper.lookaHead(searchTokens, searchToken.index, _findHelper.isSynonymByFilter(_markers.power), 2);
            //    if (tuple.found) {
            //        hasMarker = true;
            //        powerType = tuple.filterTerm.value;
            //    }
            //}

            //if (hasMarker) {
            //    assignFilter(searchToken, term, intTerm, powerType);
            //    return;
            //}

            if (!_findHelper.isInSuitableRange(intTerm, _filterTypes.power)) {
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
