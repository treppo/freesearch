module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

    var _priceFilter = require('../filters/priceFilter.js')();
    var _powerFilter = require('../filters/powerFilter.js')();
    var _mileageFilter = require('../filters/mileageFilter.js')();

    var filter = function (searchTokens) {
        return searchTokens.reduce(function (accumulator, searchToken) {
            if (searchToken.filter.type === _filterTypes.priceMarker) {
                accumulator = _filterHelper.lookBehind(accumulator, searchToken.index, _filterHelper.createAssignFilterFnc(
                    hasToBreakIteration(),
                    _priceFilter.assignFilter, {
                        hasMarker: true
                    }));
            }

            if (searchToken.filter.type === _filterTypes.powerMarker) {
                accumulator = _filterHelper.lookBehind(accumulator, searchToken.index, _filterHelper.createAssignFilterFnc(
                    hasToBreakIteration(),
                    _powerFilter.assignFilter,
                    {
                        hasMarker: true,
                        powerType: searchToken.filter.value
                    }));
            }

            if (searchToken.filter.type === _filterTypes.kmMarker) {
                accumulator = _filterHelper.lookBehind(accumulator, searchToken.index, _filterHelper.createAssignFilterFnc(
                    hasToBreakIteration(),
                    _mileageFilter.assignFilter,
                    {
                        hasMarker: true
                    }));
            }

            return accumulator;

        }, searchTokens);
    };

    var hasToBreakIteration = function () {
        var curDeep = 0;
        var maxDeep = 2;

        return function(searchToken) {
            if (_filterHelper.isMarkerFilter(searchToken.filter)) {
                return true;
            }

            if (_filterHelper.isRangeMarker(searchToken.filter)) {
                return false;
            }

            if (! _filterHelper.isUnknownFilter(searchToken.filter)) {
                return true;
            }

            curDeep++;
            return curDeep > maxDeep;
        };
    };

    return filter;
};