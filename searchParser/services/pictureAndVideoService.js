'use strict';
var t;

module.exports = function () {
    if (t) {
        return t;
    }

    t = [
        {term: 'Picture', value: 'P'},
        {term: 'Video', value: 'V'}
    ];

    return t;
};