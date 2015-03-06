var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('First registration tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number inside of suitable range and the number is followed by a first registration marker', function () {
        it('it should be parsed as first registration', function () {
            var res = parser.parse('audi 2018 Erstzulassung');

            expect(res[1].term).toBe('2018');
            expect(res[1].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[1].filter.valueFrom).toBe(2018);
            expect(res[1].filter.termFrom).toBe('2018');
        });
    });

    describe('When parse a number inside of suitable range and the number has a first registration marker preposition', function() {
        it('it should be parsed as first registration', function () {
            var res = parser.parse('audi Zulassung von 2000 bis 2014');

            expect(res[3].term).toBe('2000 - 2014');
            expect(res[3].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[3].filter.valueFrom).toBe(2000);
            expect(res[3].filter.termFrom).toBe('2000');
            expect(res[3].filter.valueTo).toBe(2014);
            expect(res[3].filter.termTo).toBe('2014');
        });
    });
});
