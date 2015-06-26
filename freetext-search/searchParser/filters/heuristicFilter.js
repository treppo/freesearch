'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _filterHelper = require('../statics/filterHelper')();

    var _isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;
    var _isMarkerFilter = require('../statics/filterTypes').isMarkerFilter;
    var _isRangeMarker = require('../statics/filterTypes').isRangeMarker;

    var _priceFilter = require('../filters/priceFilter')();
    var _powerFilter = require('../filters/powerFilter')();
    var _mileageFilter = require('../filters/mileageFilter')();
    var _firstRegistrationFilter = require('../filters/firstRegistrationFilter')().processFilter;
    var _seatFilter = require('../filters/seatFilter')();
    var _doorFilter = require('../filters/doorFilter')();
    var _prevOwnerFilter = require('../filters/previousOwnerFilter')();
    var _onlineSinceFilter = require('../filters/onlineSinceFilter')();

    var filter = function (searchTokens) {
        return searchTokens.reduce(function (accumulator, searchToken) {
            var context = {
                markerType: searchToken.filter.value,
                hasMarker: true
            };

            if (searchToken.filter.type === _filterTypes.priceMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_priceFilter, context));

                if (!context.found) {
                    accumulator = _filterHelper.iterateForward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_priceFilter, context));
                }
            }

            if (searchToken.filter.type === _filterTypes.powerMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_powerFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.kmMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_mileageFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.firstRegistrationMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_firstRegistrationFilter, context));

                if (!context.found) {
                    accumulator = _filterHelper.iterateForward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_firstRegistrationFilter, context));
                }
            }

            if (searchToken.filter.type === _filterTypes.seatMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_seatFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.doorMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_doorFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.prevOwnerMarker) {
                accumulator = _filterHelper.iterateBackward(
                    accumulator,
                    collectCondition(searchToken.index),
                    processFilter(_prevOwnerFilter, context));
            }

            if (searchToken.filter.type === _filterTypes.onlineSinceMarker) {
                if (searchToken.filter.value === 'onlinesince') {
                    accumulator = _filterHelper.iterateForward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_onlineSinceFilter, context));
                }
                else if (searchToken.filter.value === 'yesterday' || searchToken.filter.value === 'daybeforeyesterday') {
                    _onlineSinceFilter(searchToken, context);
                }
                else {
                    accumulator = _filterHelper.iterateBackward(
                        accumulator,
                        collectCondition(searchToken.index),
                        processFilter(_onlineSinceFilter, context));
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

            if (_isMarkerFilter(searchToken)) {
                return false;
            }

            if (_isRangeMarker(searchToken)) {
                return false;
            }

            if (! _isUnknownFilter(searchToken)) {
                return false;
            }

            curDeep++;
            return maxDeep >= curDeep;
        };
    };

    return filter;
};