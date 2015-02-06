module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _filterHelper = require('../statics/filterHelper.js')();

    var _isUnknownFilter = require('../statics/filterTypes.js').isUnknownFilter;
    var _isMarkerFilter = require('../statics/filterTypes.js').isMarkerFilter;
    var _isRangeMarker = require('../statics/filterTypes.js').isRangeMarker;

    var _priceFilter = require('../filters/priceFilter.js')();
    var _powerFilter = require('../filters/powerFilter.js')();
    var _mileageFilter = require('../filters/mileageFilter.js')();
    var _firstRegistration = require('../filters/firstRegistrationFilter.js')();
    var _seat = require('../filters/seatFilter.js')();
    var _prevOwner = require('../filters/previousOwnerFilter.js')();
    var _onlineSince = require('../filters/onlineSinceFilter.js')();

    var filter = function (searchTokens) {
        return searchTokens.reduce(function (accumulator, searchToken) {
            var context = {
                hasMarker: true,
                markerType: searchToken.filter.value
            };

            if (searchToken.filter.type === _filterTypes.priceMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_priceFilter.processFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.powerMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_powerFilter.processFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.kmMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_mileageFilter.processFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.firstRegistrationMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_firstRegistration.processFilter, context));

                if (!context.found) {
                    accumulator = _filterHelper.iterateForward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_firstRegistration.processFilter, context));
                }
            }

            if (searchToken.filter.type === _filterTypes.seatMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_seat.processFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.prevOwnerMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_prevOwner.processFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.onlineSinceMarker) {
                if (searchToken.filter.value === 'onlinesince') {
                    accumulator = _filterHelper.iterateForward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_onlineSince.processFilter, context));
                }
                else if (searchToken.filter.value === 'yesterday' || searchToken.filter.value === 'daybeforeyesterday') {
                    _onlineSince.processFilter(searchToken, context);
                }
                else {
                    accumulator = _filterHelper.iterateBackward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_onlineSince.processFilter, context));
                }
            }

            return accumulator;

        }, searchTokens);
    };

    var processFilter = function (processFnc, context) {
        return function (searchToken) {
            return processFnc(searchToken, context);
        };
    };

    var collectCondition = function (fromIndex) {
        var curDeep = 0;
        var maxDeep = 2;
        var isNext = false;

        // iterate from fromIndex up to maxDeep
        return function(searchToken) {
            if (searchToken.index === fromIndex) {
                isNext = true;
                return false;
            }

            if (!isNext) {
                return false;
            }

            if (_isMarkerFilter(searchToken.filter)) {
                return false;
            }

            if (_isRangeMarker(searchToken.filter)) {
                return false;
            }

            if (! _isUnknownFilter(searchToken.filter)) {
                return false;
            }

            curDeep++;
            return maxDeep >= curDeep;
        };
    };

    return filter;
};