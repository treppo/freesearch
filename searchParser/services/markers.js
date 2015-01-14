module.exports = function () {
    'use strict';

    // term is a reference to synonym object property, which contains all possible values
    var markers = {
        price: [{term: 'Euro', value: 'euro'}],
        range: [{term: 'From', value: 'from'}, {term: 'To', value: 'to'}],
        power: [{term: 'Kw', value: 'kw'}, {term: 'Ps', value: 'ps'}],
        km: [{term: 'Km', value: ''}],
        firstRegistration: [{term: 'FirstRegistration', value: ''}]
    };

    return markers;
};