var filters = require('../registeredFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Model tests', function () {
    describe('when parse search line with single model', function () {
        it('it should parse to expected model', function () {
            var res = _parser.parse('vw golf');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('golf');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Golf');
            expect(res[1].filter.value).toBe('2084');
        });
    });

    describe('when parse search line with single model build from two terms', function () {
        it('it should parse to expected model', function () {
            var res = _parser.parse('vw cross golf');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('cross golf');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.value).toBe('20315');
        });
    });

    describe('when parse search line with greedy model', function () {
        it('it should parse to expected model', function () {
            var res = _parser.parse('vw golf cross');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('golf cross');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.value).toBe('20315');
        });
    });

    describe('when parse search line with greedy model and effectively two models', function () {
        it('it should parse to expected models', function () {
            var res = _parser.parse('vw golf golf cross');

            expect(res.length).toBe(3);

            expect(res[1].term).toBe('golf cross');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.value).toBe('20315');

            expect(res[2].term).toBe('golf');
            expect(res[2].filter.type).toBe(_filterTypes.model);
            expect(res[2].filter.term).toBe('Golf');
            expect(res[2].filter.value).toBe('2084');
        });
    });
});