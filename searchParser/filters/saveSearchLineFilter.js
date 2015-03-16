'use strict';
module.exports = function (pathToFile) {
    var fs = require('fs');

    var filter = function (searchTokens) {
        if (! pathToFile)
            return searchTokens;

        var line = '';
        searchTokens.forEach(function(searchTocken) {
            line += searchTocken.term + ' ';
        });
        line = line.trim();

        if (line) {
            fs.appendFile(pathToFile, new Date().toUTCString() + '\t' +  line + '\r\n', function(err) {
                if (err)
                    throw err;
            });
        }

        return searchTokens;
    };

    return filter;
};