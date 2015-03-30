'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'Metallic', value: 'M'}
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};