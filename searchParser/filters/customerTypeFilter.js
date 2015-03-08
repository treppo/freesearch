module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes').filterTypes;
    var _findHelper = require('../statics/findHelper')();
    var _customerType = require('../services/customerTypeService')();

    var filter = function (searchTokens) {
        return _findHelper.matchTokens(searchTokens, _customerType, _filterTypes.customerType);
    };

    return filter;
};