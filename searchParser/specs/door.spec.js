var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Door tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a door', function () {
        it('it should be parsed as door', function () {
            var res = parser.parse('audi 4 türer');

            expect(res[1].term).toBe('4');
            expect(res[1].filter.type).toBe(_filterTypes.door);
            expect(res[1].filter.valueFrom).toBe(4);
            expect(res[1].filter.termFrom).toBe('4');
        });
    });

    describe('When parse a door range', function () {
        it('it should be parsed as door range', function () {
            var res = parser.parse('audi 2000 €  2 7 türen');

            expect(res[3].term).toBe('2 - 7');
            expect(res[3].filter.type).toBe(_filterTypes.door);
            expect(res[3].filter.valueFrom).toBe(2);
            expect(res[3].filter.termFrom).toBe('2');
            expect(res[3].filter.valueTo).toBe(7);
            expect(res[3].filter.termTo).toBe('7');
        });
    });
});
