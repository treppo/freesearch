'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _utilHelper = require('../statics/utilHelper')();

    var processFilter = function (searchToken, context) {
        if (!_utilHelper.isNumber(searchToken.term)) {
            return searchToken;
        }

        var maxYear = new Date().getFullYear();
        var minYear = 2000;

        var intTerm = _utilHelper.convertToInt(searchToken.term);

        context.found = true;

        searchToken.filter.type = _filterTypes.firstRegistration;
        searchToken.filter.termFrom = searchToken.term;
        searchToken.filter.valueFrom = intTerm;

        return searchToken;
    };

    return processFilter;
};