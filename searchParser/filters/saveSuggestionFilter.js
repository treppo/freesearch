'use strict';
module.exports = function () {
    var config = require('../config/indexConfig');
    var _suggester = require('suggester')(config).suggester;

    var filter = function (searchTokens) {

        var line = '';

        searchTokens.forEach(function(searchTocken) {
            line += searchTocken.term + ' ';
        });

        line = line.trim();

        if (line) {
            _suggester.createOrUpdate(line)
                .catch(function (err) {
                    console.log('suggester throws ' + err);
                }
            );
        }

        return searchTokens;
    };

    return filter;
};