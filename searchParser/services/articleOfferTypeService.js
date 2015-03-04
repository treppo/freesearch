'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
        {term: 'UsedCar', value: 'U'},
        {term: 'NewCar', value: 'N'},
        {term: 'Demonstration', value: 'D'},
        {term: 'Oldtimer', value: 'O'},
        {term: 'Jahreswagen', value: 'J'},
        {term: 'SingleDay', value: 'S'}
    ];

    return t;
};