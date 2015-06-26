'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'Car', value: 'C'},
        {term: 'Bike', value: 'B'}
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};