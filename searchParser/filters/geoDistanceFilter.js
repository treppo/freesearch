module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();
    var isUnknownSearchToken = require('../statics/filterTypes').isUnknownSearchToken;

    var _maxDistance = 200;

    var filter = function (searchTokens) {
        searchTokens.filter(isUnknownSearchToken)
            .forEach(function (searchToken) {
                processFilter(searchTokens, searchToken);
            });

        return searchTokens;
    };

    var processFilter = function (searchTokens, searchToken) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);
        if (intTerm < 0 || intTerm > _maxDistance) { // check range
            return searchToken;
        }

        // geoDistance only if have city or zip
        if (searchTokens.some(function(sToken) {
                return (sToken.filter.type === _filterTypes.city ||
                        sToken.filter.type === _filterTypes.zip)

            })) {
            searchToken.filter.type = _filterTypes.geoDistance;
            searchToken.filter.term = searchToken.term;
            searchToken.filter.value = intTerm;
        }

        return searchToken;
    };

    return filter;
};