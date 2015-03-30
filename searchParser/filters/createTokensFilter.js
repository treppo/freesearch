'use strict';
module.exports = function () {
    var _utilHelper = require('../statics/utilHelper')();

    var filter = function (searchLine) {
        return _utilHelper.tokenize(searchLine);
    };

    return filter;
};