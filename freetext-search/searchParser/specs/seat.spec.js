var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Seat tests all filters', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a seat', function () {
        it('it should be parsed as seat', function () {
            var res = parser.parse('audi 4 Sitze');

            expect(res[1].term).toBe('4');
            expect(res[1].filter.type).toBe(_filterTypes.seat);
            expect(res[1].filter.valueFrom).toBe(4);
            expect(res[1].filter.termFrom).toBe('4');
        });
    });

    describe('When parse a suitable range followed by a seat marker', function () {
        it('it should be parsed as seat range', function () {
            var res = parser.parse('audi 2000 €  2 7 Sitze');

            expect(res[3].term).toBe('2 - 7');
            expect(res[3].filter.type).toBe(_filterTypes.seat);
            expect(res[3].filter.valueFrom).toBe(2);
            expect(res[3].filter.termFrom).toBe('2');
            expect(res[3].filter.valueTo).toBe(7);
            expect(res[3].filter.termTo).toBe('7');
        });
    });
});
