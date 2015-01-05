module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js')();
    var _utilHelper = require('../statics/utilHelper.js')();
    var _filterHelper = require('../statics/filterHelper.js')();


    var filter = function (searchTokens) {
        var res = searchTokens.reduce(function (accumulator, searchToken) {
            if (searchToken.filter.type === _filterTypes.rangeMarker) {
                accumulator = _filterHelper.lookAhead(accumulator, searchToken.index, _filterHelper.createAssignFilterFnc(
                    hasToBreakIteration(),
                    adjustFilter,
                    {
                        rangeType: searchToken.filter.value
                    }));
            }

            return accumulator;

        }, searchTokens);

        return res;
    };

    var adjustFilter = function (searchToken, context) {
        if (context.rangeType === 'from') { // do nothing, range filter are build by default with only "from" value
            return;
        }

        if (_filterHelper.isUnknownFilter(searchToken.filter)) {
            return;
        }

        if (searchToken.filter.termFrom) {
            searchToken.filter.termTo = searchToken.filter.termFrom;
            searchToken.filter.termFrom = '';
        }
        if (searchToken.filter.valueFrom) {
            searchToken.filter.valueTo = searchToken.filter.valueFrom;
            if (_utilHelper.isNumber(searchToken.filter.valueFrom)) {
                searchToken.filter.valueFrom = 0;
            }
            else {
                searchToken.filter.valueFrom = null;
            }
        }
    };


    var hasToBreakIteration = function () {
        var curDeep = 0;
        var maxDeep = 1;

        return function(searchToken) {
            if (_filterHelper.isMarkerFilter(searchToken.filter)) {
                return true;
            }

            if (_filterHelper.isRangeMarker(searchToken.filter)) {
                return true;
            }

            curDeep++;
            if (curDeep > maxDeep) {
                return true;
            }

            return false;
        };
    };

    return filter;
};