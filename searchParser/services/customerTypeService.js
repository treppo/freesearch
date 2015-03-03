'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
            {term: 'Private', value: 'P'},
            {term: 'Dealer', value: 'D'}
        ];

    return t;
};