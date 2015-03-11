'use strict';
let koa = require('koa');
let serve = require('koa-static')
let marko = require('marko');
let router = require('koa-router');
let json = require('koa-json');
let querystring = require('querystring');

let _ctx = {};
let filters = require('../searchParser/registerFilters')(_ctx);
let parser = require('../searchParser/parser')(filters);

let app = koa();

app.use(serve(__dirname + '/public'));
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

app.get('/api/parse', function *() {
    var q = querystring.parse(this.request.querystring);

    this.type = 'application/json';
    if (q.s) {
        let res = parser.parse(q.s);
        this.status = 200;
        this.body = res;
    } else {
        this.status = 500;
        this.body = 'nothing found';
    }
});

app.listen(3000);