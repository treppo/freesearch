module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();

    var processFilter = function (searchToken) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);

        searchToken.filter.type = _filterTypes.prevOwner;
        searchToken.filter.termTo = searchToken.term;
        searchToken.filter.valueTo = intTerm;

        return searchToken;
    };

    return processFilter;
};