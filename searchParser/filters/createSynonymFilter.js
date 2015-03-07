module.exports = function () {
    'use strict';

    var getSynonym = require('../services/synonymService').getSynonym;

    var filter = function (searchTokens) {
        return searchTokens.map(function(searchToken) {
            searchToken.synonym = getSynonym(searchToken.term);
            return searchToken;
        });
    };

    return filter;
};