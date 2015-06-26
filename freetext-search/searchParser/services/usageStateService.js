'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        //{term: 'Used', value: 'U'}, article offer type ?
        //{term: 'New', value: 'N'}, article offer type ?
        {term: 'AccidentedCar', value: 'A'},
        {term: 'WreckCar', value: 'W'}
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};