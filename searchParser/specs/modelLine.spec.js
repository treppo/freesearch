var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Modelline tests', function () {
    describe('when parse golf', function () {
        it('it should parse to golf model', function () {
            var res = _parser.parse('vw golf blub');

            expect(res.length).toBe(3);
            expect(res[1].term).toBe('golf');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Golf');
            expect(res[1].filter.value.modelId).toBe('2084');
        });
    });

    describe('when parse golf alle', function () {
        it('it should parse to golf alle modelline', function () {
            var res = _parser.parse('vw golf alle blub');

            expect(res.length).toBe(3);
            expect(res[1].term).toBe('golf alle');
            expect(res[1].filter.type).toBe(_filterTypes.modelLine);
            expect(res[1].filter.term).toBe('Golf alle');
            expect(res[1].filter.value.modelLineId).toBe('101');
        });
    });

    describe('when parse 1er without make', function () {
        it('it should parse to 1er modelline', function () {
            var res = _parser.parse('blub 1er');

            expect(res[1].term).toBe('1er');
            expect(res[1].filter.type).toBe(_filterTypes.modelLine);
            expect(res[1].filter.term).toBe('1er');
            expect(res[1].filter.value.modelLineId).toBe('37');
        });
    });
});