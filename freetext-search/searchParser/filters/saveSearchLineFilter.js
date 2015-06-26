'use strict';

var AWS = require('aws-sdk');

module.exports = function (pathToFile) {
    var fs = require('fs');
    var isUnknownFilter = require('../statics/filterTypes').isUnknownFilter;

    var formatLine = function (searchTokens, line) {
        var d = new Date();
        var fd = d.getUTCFullYear() + '/' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
        var difCnt = searchTokens.length - (searchTokens.length - searchTokens.filter(isUnknownFilter).length);

        return fd + '\t' + line + '\t' + difCnt + '\r\n';
    };

    return function (searchTokens) {
        if (!pathToFile)
            return searchTokens;

        var line = '';
        searchTokens.forEach(function (searchTocken) {
            line += searchTocken.term + ' ';
        });
        line = line.trim();

        if (line) {
            var timestamp = new Date() / 1;
            var params = {params: { Bucket: 'as24-freetext-search', Key: 'search-' + timestamp }};
            var s3obj = new AWS.S3(params);
            s3obj.upload({ Body: formatLine(searchTokens, line) }).
                on('httpUploadProgress', function(evt) { console.log(evt); }).
                send(function(err, data) { console.log(err, data) });
        }

        return searchTokens;
    };
};