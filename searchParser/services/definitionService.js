'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();

    // term is a reference to synonym object property, which contains all possible values
    t = {
        sportCar: utilHelper.createServiceTerms([{term: 'SportCar', value: 'bis 2 sitze'}]),
        familyCar: utilHelper.createServiceTerms([{term: 'FamilyCar', value: 'ab 5 sitze'}])
    };

    return t;
};