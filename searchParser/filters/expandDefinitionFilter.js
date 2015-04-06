'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _isDefinitionFilter = require('../statics/filterTypes').isDefinitionFilter;
    var _definitions = require('../services/definitionService')();
    var _findHelper = require('../statics/findHelper')();

    return function (searchTokens) {
        searchTokens = _findHelper.matchTokens(searchTokens, _definitions.sportCar, _filterTypes.sportCarDefinition);
        searchTokens = _findHelper.matchTokens(searchTokens, _definitions.familyCar, _filterTypes.familyCarDefinition);

        var definitions = searchTokens.filter(_isDefinitionFilter);
        if (definitions.length == 0) {
            return searchTokens;
        }
        var filters = require('../registerFilters')({preExpand: 1});
        var parser = require('../parser')(filters);

        var expandedSearchLine = definitions.map(function (definition) {
            return definition.filter.value
        }).join(' ');

        var expandedSearchTokens = parser.parse(expandedSearchLine);

        return searchTokens.filter(function (searchToken) {
            return !_isDefinitionFilter(searchToken);
        }).concat(expandedSearchTokens)
            .map(function (searchToken, index) {
                searchToken.index = index; // reindex is not good here
                return searchToken;
            });
    };
    //t
};