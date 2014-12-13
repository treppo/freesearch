var makeFilter = require('../filters/makeFilter.js')();
var modelFilter = require('../filters/modelFilter.js')();
var noneFilter = require('../filters/noneFilter.js')();

var filters = [
    makeFilter, 
    modelFilter, 
    noneFilter
];

var parser = require('../parser.js')(filters);

describe('Parser Suite', function() {

    describe('Make tests', function() { 
        describe('when parse empty search line', function() {
            it('it should parse to empty result', function(done) {
                var res = parser.parse('');

                expect(res).toBeUndefined();

                done();
            });
        });
        
        describe('when parse search line with one make', function() {
            it('it should parse to expected make', function(done) {
                var res = parser.parse('bmw');

                expect(res.length).toBe(1);
                expect(res[0].term).toBe('bmw');
                expect(res[0].filter.term).toBe('BMW');
                expect(res[0].filter.type).toBe('make');
                expect(res[0].filter.value).toBe(13);
                
                done();
            });
        });
        
        describe('when parse search line with one make synonym', function() {
            it('it should parse to expected make', function(done) {
                var res = parser.parse('vw mers');
                
                expect(res.length).toBe(2);
                
                expect(res[0].term).toBe('vw');
                expect(res[0].filter.term).toBe('Volkswagen');
                expect(res[0].filter.type).toBe('make');
                expect(res[0].filter.value).toBe(74);
                
                expect(res[1].term).toBe('mers');
                expect(res[1].filter.term).toBe('Mercedes');
                expect(res[1].filter.type).toBe('make');
                expect(res[1].filter.value).toBe(47);
                
                done();
            });
        });
    });

    describe('Model tests', function() { 
        describe('when parse search line with single model', function() {
            it('it should parse to expected model', function(done) {
                var res = parser.parse('vw golf');
                
                expect(res.length).toBeTruthy();
                
                var exp = res.filter(function(item) {
                    return item.term === 'golf';
                });
                 
                expect(exp.length).toBe(1);
                //expect(exp[0].term).toBe('golf');
                expect(exp[0].filter.type).toBe('model');
                
                done();
            });
        });
        
        describe('when parse search line with single model builded from two words', function() {
            it('it should parse to expected model', function(done) {
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
    
    describe('Filter identical tests', function() { 
        describe('when parse two identical filters', function() {
            it('it should merge them to one', function(done) {
                 var res = parser.parse('merc blub mercedes bluba mers');
                
                expect(res.length).toBe(3);
                expect(res[0].term).toBe('merc mercedes mers');
                expect(res[0].filter.term).toBe('Mercedes');
                expect(res[0].filter.type).toBe('make');
                expect(res[0].filter.value).toBe(47);
                
                expect(res[1].filter.type).toBe('unknown');
                expect(res[2].filter.type).toBe('unknown');
            
                done();
            });
        });
    });
    
    
});