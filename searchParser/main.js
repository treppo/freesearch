var filters = require('../registeredFilters.js')();
var parser = require('../parser.js')(filters);

var searchLine = 'bmw';
var res = parser.parse(searchLine);

var bb = 1;
bb = bb + 1;
console.log('Done servus');
//var b = res.length;