module.exports = function () {
    'use strict';

    var config = require('../config/indexConfig.js');
    var _suggester = require('suggester')(config).suggester;

    var filter = function (searchTokens) {

        var line = '';

        searchTokens.forEach(function(searchTocken) {
            line += searchTocken.term + ' ';
        });

        line = line.trim();

        if (line) {
            try {
                _suggester.createOrUpdate(line);
            }
            catch(e) {
                console.log('suggester throws ' + e);
            }
        }

        return searchTokens;
    };

    return filter;
};