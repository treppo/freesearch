'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
        {term: 'Car', value: 'C'},
        {term: 'Bike', value: 'B'}
    ];

    return t;
};