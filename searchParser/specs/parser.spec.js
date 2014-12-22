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

    describe('when parse empty search line', function() {
        it('it should parse to empty result', function(done) {
            var res = parser.parse('');

            expect(res).toBeUndefined();

            done();
        });
    });

    describe('Make tests', function() { 
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

        describe('when parse search line with same make multiple times', function() {
            xit('it should parse to expected make', function(done) {
                var res = parser.parse('bmw bmw bmw');

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

                debugger;
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

                expect(res.length).toBe(2);
                expect(res[1].term).toBe('golf');
                expect(res[1].filter.type).toBe('model');
                expect(res[1].filter.term).toBe('Golf');
                expect(res[1].filter.value).toBe(2084);

                done();
            });
        });

        describe('when parse search line with single model build from two terms', function() {
            it('it should parse to expected model', function(done) {
                var res = parser.parse('vw cross golf');
                //var res = parser.parse('vw golf cabriolet');

                expect(res.length).toBe(2);

                expect(res[1].term).toBe('cross golf');
                expect(res[1].filter.type).toBe('model');
                expect(res[1].filter.term).toBe('Cross Golf');
                expect(res[1].filter.value).toBe(20315);

                done();
            });
        });

        describe('when parse search line with greedy model', function() {
            it('it should parse to expected model', function(done) {
                var res = parser.parse('vw golf cross');

                expect(res.length).toBe(2);

                expect(res[1].term).toBe('golf cross');
                expect(res[1].filter.type).toBe('model');
                expect(res[1].filter.term).toBe('Cross Golf');
                expect(res[1].filter.value).toBe(20315);

                done();
            });
        });

        describe('when parse search line with greedy model and effectively two models', function() {
            it('it should parse to expected models', function(done) {
                var res = parser.parse('vw golf golf cross');

                expect(res.length).toBe(3);

                expect(res[1].term).toBe('golf cross');
                expect(res[1].filter.type).toBe('model');
                expect(res[1].filter.term).toBe('Cross Golf');
                expect(res[1].filter.value).toBe(20315);

                expect(res[2].term).toBe('golf');
                expect(res[2].filter.type).toBe('model');
                expect(res[2].filter.term).toBe('Golf');
                expect(res[2].filter.value).toBe(2084);

                done();
            });
        });
    });
    
    describe('Filter identical terms tests', function() {
        describe('when parse two identical filters', function() {
            xit('it should merge them to one', function(done) {
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