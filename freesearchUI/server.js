'use strict';

let koa = require('koa');
let serve = require('koa-static')
let marko = require('marko');
let router = require('koa-router');
let json = require('koa-json');
let querystring = require('querystring');
let path  = require('path');
let request = require('co-request');
var iconv = require('iconv-lite');

let app = koa();

app.use(serve(path.join(__dirname, 'public')));
app.use(router(app));
app.use(json());

app.get('/', function *() {
    this.body = marko.load('./views/index.marko').stream();
    this.type = 'text/html';
});

app.get('/api/suggest', function *() {
    var maxSuggestions = 6;

    this.status = 200;
    this.type = 'application/json';
    let q = querystring.parse(this.request.querystring);
    if (q.s) {
        let requestOptions = {
            uri: 'http://google.de/complete/search?output=toolbar&hl=de&q=' + q.s,
            timeout: 5000,
            encoding: null
        };
        //this.body = [{ label: 'bar' }, { label: 'bbb' }];

        let result = yield request(requestOptions);
        if (result.statusCode == 200) {
            var parseString = require('xml2js').parseString;
            this.body = [];
            var xml = iconv.decode(result.body, 'iso-8859-1');

            var that = this;
            parseString(xml, function (err, result) {
                if (result && result.toplevel && result.toplevel.CompleteSuggestion) {
                    var sugs = result.toplevel.CompleteSuggestion;
                    that.body = sugs.map(function(sug) {
                        var t = sug.suggestion[0];
                        var f = t['$'];
                        var h = f.data;
                        return {
                            label: h
                        };
                    }).slice(0, maxSuggestions);
                }
            });
        }
        //yield next;
    }
});

app.get('/api/parse', function *(next) {
        let ctx = {
            infra: true,
            saveSearchLineToFile: path.join(__dirname, 'logs', 'searchLine.log')
        };

        let q = querystring.parse(this.request.querystring);
        if (q.s) {
            this.parseResult = getParserResults(q.s, ctx);
            this.parseCtx = ctx;
        }

        yield next;
    },

    function *(next) {
        let requestOptions = {
            uri: 'http://www.autoscout24.de/GN/CountV1.ashx?tab=location',
            timeout: 5000
        };

        if (this.parseCtx && this.parseCtx.publicQueryParams) {
            requestOptions.uri= 'http://www.autoscout24.de/GN/CountV1.ashx?tab=location' + this.parseCtx.publicQueryParams;
        }

        let result = yield request(requestOptions);
        if (result.statusCode == 200) {
            let json = JSON.parse(result.body);
            if (json && json.tc) {
                if (this.parseResult)
                    this.parseResult.counter = json.tc;
                else
                    this.parseResult = { counter : json.tc };
            }
        }

        yield next;
    },

    function *(next) {
        this.type = 'application/json';

        if (this.parseResult) {
            this.body = this.parseResult;
            this.status = 200;
        } else {
            this.body = 'an error occurred';
            this.status = 500;
        }
        yield next;
    }
);

app.listen(3000);

let getParserResults = function(searchLine, ctx) {
    let isMarkerFilter =  require('../searchParser/statics/filterTypes').isMarkerFilter;
    let isRangeMarker =  require('../searchParser/statics/filterTypes').isRangeMarker;
    let filters = require('../searchParser/registerFilters')(ctx);
    let parser = require('../searchParser/parser')(filters);

    let searchTokens = parser.parse(searchLine);

    searchTokens = searchTokens.filter(function(searchToken) {
        return !(isMarkerFilter(searchToken.filter) || isRangeMarker(searchToken.filter));
    });

    let listQuery = 'http://fahrzeuge.autoscout24.de/?' + ctx.publicQueryParams;

    return {
        searchTokens: searchTokens,
        listQuery: listQuery
    };
};
