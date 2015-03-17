//'use strict';

var koa = require('koa');
var serve = require('koa-static')
var marko = require('marko');
var router = require('koa-router');
var json = require('koa-json');
var querystring = require('querystring');
var path  = require('path');
var Promise = require("bluebird");

var app = koa();

app.use(serve(path.join(__dirname, 'public')));
app.use(router(app));
app.use(json());

app.get('/', function *() {
    this.body = marko.load('./views/index.marko').stream();
    this.type = 'text/html';
});

app.get('/api/autocomplete', function *() {
    this.status = 200;
    this.type = 'application/json';
    this.body = [{ label: 'bar' }, { label: 'bbb' }];
});


app.get('/api/parse', function *(next) {
        var ctx = {
            infra: true,
            saveSearchLineToFile: path.join(__dirname,'logs', 'searchLine.log')
        };

        var q = querystring.parse(this.request.querystring);
        if (q.s) {
            this.parseResult = getParserResults(q.s, ctx);
            this.parseCtx = ctx;
        }

        yield next;
    },

    function *(next) {
        console.log('aaa ' + this.parseCtx.publicQueryParams);
        var that = this;

        if (this.parseCtx && this.parseCtx.publicQueryParams) {
            console.log('aaba');
            readCounterPromise(this.parseCtx.publicQueryParams).then(function(json) {
                console.log('fullfiled' + JSON.stringify(json));
                if (json && json.tc) {
                    that.parseResult.counter = json.tc;
                }
            });
            yield next;
        }
        else {
            yield  next;
        }
    },

    function *() {
        this.type = 'application/json';

        if (this.parseResult && this.parseResult.searchTokens) {
            this.body = this.parseResult;
            this.status = 200;
        } else {
            this.body = 'an error occurred';
            this.status = 500;
        }
        //yield next;
    }
);

app.listen(3000);


var getParserResults = function(searchLine, ctx) {
    console.log('getparser');
    var isMarkerFilter =  require('../searchParser/statics/filterTypes').isMarkerFilter;
    var isRangeMarker =  require('../searchParser/statics/filterTypes').isRangeMarker;
    var filters = require('../searchParser/registerFilters')(ctx);
    var parser = require('../searchParser/parser')(filters);

    var searchTokens = parser.parse(searchLine);

    searchTokens = searchTokens.filter(function(searchToken) {
        return !(isMarkerFilter(searchToken.filter) || isRangeMarker(searchToken.filter));
    });

    var listQuery = 'http://fahrzeuge.autoscout24.de/?' + ctx.publicQueryParams;

    return {
        searchTokens: searchTokens,
        listQuery: listQuery
//        counter: ctx.counter
    };
};

function readCounterPromise(countQueryParams) {
    var http = require('http');
    var path = '/GN/CountV1.ashx?tab=location';
    var options = {
        host: 'www.autoscout24.de',
        keepAlive: true
    };

    return new Promise(function (fulfill, reject) {
        options.path = path + countQueryParams;
        var request = http.request(options, function (response) {
            var data = '';

            response.on('data', function (chunk) {
                data += chunk;
            });
            console.log('callback ' + options.path);
            response.on('end', function () {
                var json = JSON.parse(data);

                fulfill(json);
            });
        });

        request.end();
        //console.log('out promise');
    })
}