'use strict';
module.exports = function () {
    return function (searchTokens) {
        console.log(searchTokens);
        return searchTokens;
    };
};