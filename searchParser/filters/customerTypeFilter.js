module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _customerType = require('../services/customerTypeService.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _customerType, _filterTypes.customerType);
    };

    return filter;
};