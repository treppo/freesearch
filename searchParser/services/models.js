module.exports = function () {
    'use strict';

    // search is greedy, define models with the most count of terms on the top of a group, e.g:
    //      Polo R WRC
    //      Polo Cross
    //      Polo
    //

    var models = [
        {term: 'Cross Golf', value: 20315},
        {term: 'Golf', value: 2084},
    ];

    return models;
};