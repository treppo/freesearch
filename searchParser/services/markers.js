module.exports = function () {
    'use strict';

    var markers = {
        price: [ {term: 'Euro', value: 'euro'} ],
        range: [ {term: 'From', value: 'from'}, {term: 'To', value: 'to'} ],
        power: [ {term: 'Kw', value: 'kw'}, {term: 'Ps', value: 'ps'} ]
    };

    return markers;
};