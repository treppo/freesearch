'use strict';
module.exports = function (context) {

    var http = require('http');
    var _path =  '/GN/CountV1.ashx?tab=location';
    var options = {
        host: 'www.autoscout24.de',
        keepAlive: true
    };

    var callback = function(response) {
        var data = '';

        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            var json = JSON.parse(data);
            console.log(data);
            context.counter = 0;
            if (json.tc)
                context.counter = json.tc;
        });
    };

    var filter = function (searchTokens) {
        if (context && context.publicQueryParams) {
            options.path = _path + context.publicQueryParams;
            var request = http.request(options, callback);
            request.end();
            return searchTokens;
        }
        else {
            return searchTokens;
        }
    };

    return filter;
};