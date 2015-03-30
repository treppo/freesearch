'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'UsedCar', value: 'U'},
        {term: 'NewCar', value: 'N'},
        {term: 'Demonstration', value: 'D'},
        {term: 'Oldtimer', value: 'O'},
        {term: 'Jahreswagen', value: 'J'},
        {term: 'SingleDay', value: 'S'}
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};