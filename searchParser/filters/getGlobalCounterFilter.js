'use strict';
module.exports = function (context) {

    var http = require('http');
    var _path =  '/GN/CountV1.ashx?tab=location';
    var options = {
        host: 'www.autoscout24.de'
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
        if (context && context.publicQueryParams){
            options.path = _path + context.publicQueryParams;
            console.log(options.path);
            http.request(options, callback).end();
        }

        return searchTokens;
    };

    return filter;
};