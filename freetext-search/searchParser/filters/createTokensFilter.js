'use strict';
module.exports = function () {
    var _utilHelper = require('../statics/utilHelper')();

    return function (searchLine) {
        return _utilHelper.tokenize(searchLine);
    };
};