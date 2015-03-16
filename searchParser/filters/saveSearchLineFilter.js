'use strict';
module.exports = function (pathToFile) {
    var fs = require('fs');

    var formatDate = function(d) {
        return d.getUTCFullYear() +'/'+ (d.getUTCMonth()+1) +'/'+ d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
    };

    var filter = function (searchTokens) {
        if (! pathToFile)
            return searchTokens;

        var line = '';
        searchTokens.forEach(function(searchTocken) {
            line += searchTocken.term + ' ';
        });
        line = line.trim();

        if (line) {
            fs.appendFile(pathToFile, formatDate(new Date()) + '\t' +  line + '\r\n', function(err) {
                if (err)
                    throw err;
            });
        }

        return searchTokens;
    };

    return filter;
};