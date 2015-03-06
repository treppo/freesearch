module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();

    var processFilter = function (searchToken, context) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var intTerm = _utilHelper.convertToInt(searchToken.term);

        context.found = true;

        searchToken.filter.type = _filterTypes.firstRegistration;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return processFilter;
};