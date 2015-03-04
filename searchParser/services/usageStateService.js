'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
        //{term: 'Used', value: 'U'}, article offer type ?
        //{term: 'New', value: 'N'}, article offer type ?
        {term: 'AccidentedCar', value: 'A'},
        {term: 'WreckCar', value: 'W'}
    ];

    return t;
};