
var makeFilter = require('./filters/makeFilter.js')();
var modelFilter = require('./filters/modelFilter.js')();
// var noneFilter = require('./filters/noneFilter.js')();

var filters = [
    makeFilter, 
    //modelFilter, 
    // noneFilter
];

var parser = require('./parser.js')(filters);
var searchLine = 'bmw';
var res = parser.parse(searchLine);

var bb = 1;
bb = bb + 1;
console.log('Done servus');
//var b = res.length;