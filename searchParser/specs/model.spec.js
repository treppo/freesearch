var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Model tests', function () {
    describe('when parse single model', function () {
        it('it should parse to expected model', function () {
            var res = _parser.parse('vw golf');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('golf');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Golf');
            expect(res[1].filter.value.modelId).toBe('2084');
        });
    });

    describe('when parse with single model build from two terms', function () {
        it('it should parse to expected model', function () {
            var res = _parser.parse('vw cross golf');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('cross golf');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.value.modelId).toBe('20315');
        });
    });

    describe('when parse model consisting from several words', function () {
        it('it should parse to expected model', function () {
            var res = _parser.parse('vw golf cross');

            expect(res.length).toBe(2);

            expect(res[1].term).toBe('golf cross');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.value.modelId).toBe('20315');
        });
    });

    describe('when parse effectively two models', function () {
        it('it should parse both', function () {
            var res = _parser.parse('vw golf golf cross');

            expect(res.length).toBe(3);

            expect(res[1].term).toBe('golf cross');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('Cross Golf');
            expect(res[1].filter.value.modelId).toBe('20315');

            expect(res[2].term).toBe('golf');
            expect(res[2].filter.type).toBe(_filterTypes.model);
            expect(res[2].filter.term).toBe('Golf');
            expect(res[2].filter.value.modelId).toBe('2084');
        });
    });


    describe('when parse not unique model with a make', function () {
        it('it should parse to model of this make', function () {
            var res = _parser.parse('audi 100');

            expect(res[1].term).toBe('100');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('100');
            expect(res[1].filter.value.modelId).toBe('1619');
        });
    });

    describe('when parse not unique model with a make', function () {
        it('it should parse to model of this make', function () {
            var res = _parser.parse('audi 100 bmw x5');

            expect(res[1].term).toBe('100');
            expect(res[1].filter.type).toBe(_filterTypes.model);
            expect(res[1].filter.term).toBe('100');
            expect(res[1].filter.value.modelId).toBe('1619');

            expect(res[3].term).toBe('x5');
            expect(res[3].filter.type).toBe(_filterTypes.model);
            expect(res[3].filter.term).toBe('X5');
            expect(res[3].filter.value.modelId).toBe('16406');
        });
    });

    describe('when parse model without make', function () {
        it('it should find the model', function () {
            var res = _parser.parse('electra');

            expect(res[0].term).toBe('electra');
            expect(res[0].filter.type).toBe(_filterTypes.model);
            expect(res[0].filter.term).toBe('Electra');
            expect(res[0].filter.value.modelId).toBe('1669');
        });
    });
});