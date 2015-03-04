'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
        {term: 'ManualTransmission', value: 'M'}, // Schaltgetriebe
        {term: 'Automatic', value: 'A'}, // Automatik
        {term: 'Semiautomatic', value: 'S'} // Halbautomatik
    ];

    return t;
};