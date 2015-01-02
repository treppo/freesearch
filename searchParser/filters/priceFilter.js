module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();
    var _markers = require('../services/markers.js')();

    var filter = function(searchTokens) {
        searchTokens.forEach(function(searchToken) {
            if (searchToken.filter.type !== _filterTypes.unknown) {
                return;
            }

            var term = searchToken.term;

            var tuple = _findHelper.containsSynonymByFilter(_markers.price)(searchToken);
            var hasMarker = tuple.found;
            if (tuple.found) {
                hasMarker = true;
                term = tuple.term;
            }

            if (! _utilHelper.isNumber(term)) {
                return;
            }
            var intTerm = _utilHelper.convertToInt(term);

            if (! hasMarker) {
                tuple =_utilHelper.lookaHead(searchTokens, searchToken.index, _findHelper.isSynonymByFilter(_markers.power), 2);
                if (tuple.found) {
                    hasMarker = true;
                }
            }

            if (hasMarker) {
                assignFilter(searchToken, term, intTerm);
                return;
            }

            if (! _findHelper.isInSuitableRange(intTerm,  _filterTypes.price)) {
                return;
            }

            assignFilter(searchToken, term, intTerm);
        });

        return searchTokens;
    };

    var assignFilter = function (searchToken, term, intTerm) {
        searchToken.filter.type = _filterTypes.price;
        searchToken.filter.termFrom = term;
        searchToken.filter.valueFrom = intTerm;
    };

    return filter;
};