module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _models = require('../services/modelService')();

    var filter = function (searchTokens) {
        var res = _findHelper.matchTokens(searchTokens, _models, _filterTypes.model, 0, filterModelBasedOnMake);
        return res;
    };

    var filterModelBasedOnMake = function (service, unknownSearchToken, searchTokens) {
        var unknownIndex = unknownSearchToken.index;

        // is in the search line a make before the [possible] model ?
        var makeId = 0;
        searchTokens.some(function(searchToken) {
            var found = (searchToken.filter.type === _filterTypes.make && unknownIndex > searchToken.index);
            if (found) {
                makeId = searchToken.filter.value;
            }
        });

        if (makeId > 0) {
            return service.filter(function(serviceToken) {
                return (serviceToken.value.makeId == makeId);
            });
        }
        return service;
    };

    return filter;
};