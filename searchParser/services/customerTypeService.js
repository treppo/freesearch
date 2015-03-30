'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'Private', value: 'P'},
        {term: 'Dealer', value: 'D'}
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};