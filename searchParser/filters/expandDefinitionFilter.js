'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _isDefinitionFilter = require('../statics/filterTypes').isDefinitionFilter;
    var _definitions = require('../services/definitionService')();
    var _findHelper = require('../statics/findHelper')();
    var _utilHelper = require('../statics/utilHelper')();


    var filter = function (searchTokens) {
        searchTokens = _findHelper.matchTokens(searchTokens, _definitions.sportCar, _filterTypes.sportCarDefinition);
        //        searchTokens = _findHelper.matchTokens(searchTokens, _definitions.familyCar, _filterTypes.familyCarDefinition);

        var defs = searchTokens.filter(_isDefinitionFilter);
        if (defs.length == 0) {
            return searchTokens;
        }

        var maxIndex = 0;
        searchTokens.forEach(function (searchTocken) {
            if (searchTocken.index > maxIndex)
                maxIndex = searchTocken.index;
        });

        defs.forEach(function (definition) {
            maxIndex += 1;
            var tokens = _utilHelper.tokenize(definition.filter.value);
            tokens.forEach(function(token) {
                var searchToken = _utilHelper.createDefaultSearchToken(token, maxIndex);
                searchTokens.push(searchToken);
            });
        });

        return searchTokens;
    };

    return filter;
};