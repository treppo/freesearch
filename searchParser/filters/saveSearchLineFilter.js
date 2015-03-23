'use strict';
module.exports = function (pathToFile) {
    var fs = require('fs');
    var isUnknownSearchToken = require('../statics/filterTypes').isUnknownSearchToken;

    var formatLine = function (searchTokens, line) {
        var d = new Date();
        var fd = d.getUTCFullYear() + '/' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
        var difCnt = searchTokens.length - (searchTokens.length - searchTokens.filter(isUnknownSearchToken).length);

        return fd + '\t' + line + '\t' + difCnt + '\r\n';
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
            fs.appendFile(pathToFile, formatLine(searchTokens, line), function(err) {
                if (err)
                    throw err;
            });
        }

        return searchTokens;
    };

    return filter;
};