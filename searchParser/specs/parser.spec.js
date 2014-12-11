var makeFilter = require('../filters/makeFilter.js')();
// var modelFilter = require('../filters/modelFilter.js')();
// var noneFilter = require('../filters/noneFilter.js')();

var filters = [
    makeFilter, 
    // modelFilter, 
    // noneFilter
];

var parser = require('../parser.js')(filters);

describe("Parser Suite", function() {

    describe("given empty search line", function() {
        it("should parse to empty result", function(done) {
            var res = parser.parse('');
            
            expect(res).toBeUndefined();
                       
            done();
        });
    });
    
    describe("given search line with one make", function() {
        it("should parse to expected make", function(done) {
            var searchLine = 'bmw';
            var res = parser.parse(searchLine);
            
            expect(res.length).toBe(1);
            expect(res[0].term).toBe('bmw');
            expect(res[0].type).toBe('make');
            
            done();
        });
    });
    
});