var _filterTypes = require('../statics/filterTypes').filterTypes;



describe('Previous owner tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number outside of suitable range but the number is followed by a previous owner marker', function () {
        it('it should be parsed as previous owner', function () {
            var res = parser.parse('audi 4 Hand');

            expect(res[1].term).toBe('4');
            expect(res[1].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[1].filter.valueFrom).toBe(4);
            expect(res[1].filter.termFrom).toBe('4');
        });
    });

    describe('When parse a suitable range followed by a previous owner marker', function () {
        it('it should be parsed as seat range', function () {
            var res = parser.parse('audi 2000 € von 2 bis 3 Halter');

            expect(res[4].term).toBe('2 - 3');
            expect(res[4].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[4].filter.valueFrom).toBe(2);
            expect(res[4].filter.termFrom).toBe('2');
            expect(res[4].filter.valueTo).toBe(3);
            expect(res[4].filter.termTo).toBe('3');
        });
    });
});
