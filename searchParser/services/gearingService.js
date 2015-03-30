'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    var utilHelper = require('../statics/utilHelper')();
    t = [
        {term: 'ManualTransmission', value: 'M'}, // Schaltgetriebe
        {term: 'Automatic', value: 'A'}, // Automatik
        {term: 'Semiautomatic', value: 'S'} // Halbautomatik
    ];
    t = utilHelper.createServiceTerms(t);

    return t;
};