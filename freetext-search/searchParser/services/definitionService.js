'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();

    // term is a reference to synonym object property, which contains all possible values
    t = {
        sportCar: utilHelper.createServiceTerms([{term: 'SportCar', value: 'von 2 bis 2 sitze ab 250 ps'}]),
        familyCar: utilHelper.createServiceTerms([{term: 'FamilyCar', value: 'ab 5 sitze van'}])
    };

    return t;
};