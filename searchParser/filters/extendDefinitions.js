'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _definitions = require('../services/definitionService')();
    var _findHelper = require('../statics/findHelper')();

    var filter = function (searchTokens) {
        //searchTokens = _findHelper.matchTokens(searchTokens, _definitions.sportCar, _filterTypes.sportCarDefinition);
        //searchTokens = _findHelper.matchTokens(searchTokens, _definitions.familyCar, _filterTypes.familyCarDefinition);

        return searchTokens;
    };

    return filter;
};