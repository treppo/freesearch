var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js')();

describe('Recognize range marker tests', function () {
    describe('when parse "from" range token', function () {
        it('it should assign "from" value', function () {
            var res = _parser.parse('von 1000 €');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('1000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.termFrom).toBe('1000');
            expect(res[0].filter.valueFrom).toBe(1000);
            expect(res[0].filter.valueTo).toBeUndefined();
            expect(res[0].filter.termTo).toBeUndefined();
        });
    });

    describe('when parse "to" range token', function () {
        it('it should assign "to" value', function () {
            var res = _parser.parse('bis 1000 €');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('1000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termTo).toBe('1000');
            expect(res[0].filter.valueTo).toBe(1000);
        });

        it('it should assign "to" value', function () {
            var res = _parser.parse('bis 1000 blub €');

            expect(res.length).toBe(2);
            expect(res[0].term).toBe('1000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termTo).toBe('1000');
            expect(res[0].filter.valueTo).toBe(1000);
        });
    });

    describe('when parse "from" and "to" range tokens', function () {
        it('it should assign both values', function () {
            var res = _parser.parse('von 1000 bis 2000 €');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('1000 - 2000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.termFrom).toBe('1000');
            expect(res[0].filter.valueFrom).toBe(1000);
            expect(res[0].filter.termTo).toBe('2000');
            expect(res[0].filter.valueTo).toBe(2000);
        });
    });

    describe('when parse "from" and "to" range tokens', function () {
        it('it should assign both values', function () {
            var res = _parser.parse('1000 2000 € bis 200 KW');

            expect(res.length).toBe(2);
            expect(res[0].term).toBe('1000 - 2000');
            expect(res[0].filter.type).toBe(_filterTypes.price);
            expect(res[0].filter.termFrom).toBe('1000');
            expect(res[0].filter.valueFrom).toBe(1000);
            expect(res[0].filter.termTo).toBe('2000');
            expect(res[0].filter.valueTo).toBe(2000);

            expect(res[1].term).toBe('200');
            expect(res[1].filter.type).toBe(_filterTypes.power);
            expect(res[1].filter.termFrom).toBeUndefined();
            expect(res[1].filter.valueFrom).toBeUndefined();
            expect(res[1].filter.termTo).toBe('200');
            expect(res[1].filter.valueTo).toBe(200);
        });
    });
});