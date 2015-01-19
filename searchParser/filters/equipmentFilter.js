module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _equipment = require('../services/equipmentService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _equipment, _filterTypes.equipment);
    };

    return filter;
};