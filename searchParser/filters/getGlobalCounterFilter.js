'use strict';
module.exports = function (context) {

    var Promise = require("bluebird");

    var http = require('http');
    var _path =  '/GN/CountV1.ashx?tab=location';
    var _options = {
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

    var readCounter = function () {
        _options.path = _path + context.publicQueryParams;
        var request = http.request(_options, callback);
        request.end();
    };

    function readCounterPromise() {
        return new Promise(function(fulfill, reject) {
            console.log('in promise');
            _options.path = _path + context.publicQueryParams;

            var request = http.request(_options, function (response) {
                var data = '';

                response.on('data', function (chunk) {
                    data += chunk;
                });

                response.on('end', function () {
                    var json = JSON.parse(data);
                    console.log('callback');
                    fulfill(json);
                });
            });

            request.end();
            console.log('out promise');
        })
    }

    var filter = function (searchTokens) {
        console.log('hi');
        if (context && context.publicQueryParams) {
            console.log('promise entering');
            readCounterPromise().then(function(json) {
                console.log('fullfiled');
                if (json && json.tc)
                    context.counter = json.tc;

                return searchTokens;
            });
            console.log('exit');
        }
        else {
            return searchTokens;
        }
    };

    return filter;
};