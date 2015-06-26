'use strict';
module.exports = function () {
    var getSynonym = require('../services/synonymService').getSynonym;

    return function (searchTokens) {
        return searchTokens.map(function (searchToken) {
            if (!searchToken.synonym)
                searchToken.synonym = getSynonym(searchToken.term);

            return searchToken;
        });
    };
};