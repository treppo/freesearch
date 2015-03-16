'use strict';
module.exports = function () {
    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _equipment = require('../services/equipmentService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _equipment, _filterTypes.equipment);
    };

    return filter;
};