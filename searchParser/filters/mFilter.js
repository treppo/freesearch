module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _filterHelper = require('../statics/filterHelper.js')();
    var _utilHelper = require('../statics/utilHelper.js')();


    var createApplyPriceFilter = function () {
        var curDeep = 0;
        var maxDeep = 2;
        var applyPriceFilter = function (searchToken) {
            if (_filterHelper.isMarkerFilter(searchToken.filter)) {
                return true;
            }
            if (_filterHelper.isFilterDone(searchToken.filter)) {
                return true;
            }

            curDeep++;
            if (curDeep > maxDeep) {
                return true;
            }

            if (!_utilHelper.isNumber(searchToken.term)) {
                return false;
            }

            var intTerm = _utilHelper.convertToInt(searchToken.term);

            searchToken.filter.type = _filterTypes.price;
            searchToken.filter.termFrom = searchToken.term;
            searchToken.filter.valueFrom = intTerm;

            return false;
        };

        return applyPriceFilter;
    };

    var filter = function (searchTokens) {
        var t = searchTokens;
        searchTokens.forEach(function (searchToken) {
            if (searchToken.filter.type === _filterTypes.priceMarker) {
                t = _filterHelper.lookBehind(t, searchToken.index, createApplyPriceFilter());
            }
        });

        return t;
    };

    return filter;
};