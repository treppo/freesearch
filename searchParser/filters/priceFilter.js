module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _findHelper = require('../statics/findHelper.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

    var filter = function (searchTokens) {
        searchTokens.forEach(function (searchToken) {
            if (_filterHelper.isFilterDone(searchToken.filter)) {
                return;
            }

            if (!_utilHelper.isNumber(searchToken.term)) {
                return;
            }

            var intTerm = _utilHelper.convertToInt(searchToken.term);

            if (!_findHelper.isInSuitableRange(intTerm, _filterTypes.price)) {
                return;
            }

            assignFilter(searchToken, searchToken.term, intTerm);
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