module.exports = function () {
    'use strict';

    var _filterTypes = require('../statics/filterTypes.js').filterTypes;
    var _findHelper = require('../statics/findHelper.js')();
    var _makes = require('../services/makes.js')();

    var filter = function (searchTokens) {
        return _findHelper.searchTokens(searchTokens, _makes, _filterTypes.make);
    };

    return filter;
};