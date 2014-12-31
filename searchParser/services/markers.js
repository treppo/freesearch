module.exports = function () {
    'use strict';

    var markers = {
        price: [{term: '€', value: 0}],
        range: [{term: 'from', value: 'from'}, {term: 'to', value: 'to'}],
        power: [{term: 'kw', value: 'kw'}, {term: 'ps', value: 'ps'}]
    };

    return markers;
};