module.exports = function () {
    'use strict';
    
    var _filterTypes = require('../statics/filterTypes.js')();
    var _parseHelper = require('../statics/findHelper.js')();
        
    var _models = [
        { term : 'Cross Golf', value: 20315 },
        { term : 'Golf', value : 2084 },
    ];

    var filter = function(searchTokens) {
        return _parseHelper.findFilters(searchTokens, _models, _filterTypes.model);
    };

    return filter;
};