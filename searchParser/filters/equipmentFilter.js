module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _equipment = require('../services/equipmentService')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _equipment, _filterTypes.equipment);
    };

    return filter;
};