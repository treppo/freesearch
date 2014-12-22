module.exports = function () {
    'use strict';
    
    var _filterTypes = require('../statics/filterTypes.js')();
    var _parseHelper = require('../statics/findHelper.js')();
    var _models = require('../services/models.js')();
        
    var filter = function(searchTokens) {
        return _parseHelper.findFilters(searchTokens, _models, _filterTypes.model);
    };

    return filter;
};