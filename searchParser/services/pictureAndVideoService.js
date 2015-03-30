'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'Picture', value: 'P'},
        {term: 'Video', value: 'V'}
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};