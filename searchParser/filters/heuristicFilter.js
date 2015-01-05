module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _filterHelper = require('../statics/filterHelper.js')();

    var _priceFilter = require('../filters/priceFilter.js')();
    var _powerFilter = require('../filters/powerFilter.js')();

    var filter = function (searchTokens) {
        var res = searchTokens.reduce(function (accumulator, searchToken) {
            if (searchToken.filter.type === _filterTypes.priceMarker) {
                accumulator = _filterHelper.lookBehind(accumulator, searchToken.index, _filterHelper.createAssignFilterFnc(_priceFilter.assignFilter, {
                    hasMarker: true
                }));
            }

            if (searchToken.filter.type === _filterTypes.powerMarker) {
                accumulator = _filterHelper.lookBehind(accumulator, searchToken.index, _filterHelper.createAssignFilterFnc(_powerFilter.assignFilter, {
                    hasMarker: true,
                    powerType: searchToken.filter.value
                }));
            }

            return accumulator;

        }, searchTokens);

        return res;
    };

    return filter;
};