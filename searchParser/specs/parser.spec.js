var makeFilter = require('../filters/makeFilter.js')();
var modelFilter = require('../filters/modelFilter.js')();
var noneFilter = require('../filters/noneFilter.js')();

var filters = [
    makeFilter, 
    modelFilter, 
    noneFilter
];

var parser = require('../parser.js')(filters);

describe("Parser Suite", function() {

    describe("Make tests", function() { 
        describe("given empty search line", function() {
            it("it should parse to empty result", function(done) {
                var res = parser.parse('');

                expect(res).toBeUndefined();

                done();
            });
        });
        
        describe("given search line with one make", function() {
            it("it should parse to expected make", function(done) {
                var res = parser.parse('bmw');
                
                expect(res.length).toBe(1);
                expect(res[0].term).toBe('bmw');
                expect(res[0].type).toBe('make');
                
                done();
            });
        });
    });

    describe("Make tests", function() { 
        describe("given search line with single model", function() {
            it("it should parse to expected model", function(done) {
                var res = parser.parse('vw golf');
                
                expect(res.length).toBeTruthy();
                
                var exp = res.filter(function(item) {
                    return item.term === 'golf';
                });
                 
                expect(exp.length).toBe(1);
                expect(exp[0].term).toBe('golf');
                expect(exp[0].type).toBe('model');
                
                done();
            });
        });
        
        describe("given search line with double model", function() {
            it("it should parse to expected model", function(done) {
                var res = parser.parse('vw cross golf');
                //var res = parser.parse('vw golf cabriolet');
                
                expect(res.length).toBeTruthy();
                
                // var exp = res.filter(function(item) {
                    // return item.term === 'golf';
                // });
                 
                // expect(exp.length).toBe(1);
                // expect(exp[0].term).toBe('golf');
                // expect(exp[0].type).toBe('model');
                
                done();
            });
        });
    });
    
});