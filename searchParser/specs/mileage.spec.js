var _filterTypes = require('../statics/filterTypes').filterTypes;
var _maxMileage = 1000000;

describe('Mileage tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a mileage', function () {
        it('it should be parsed as mileage', function () {
            var res = parser.parse('audi 6500 km');

            expect(res[1].term).toBe('6500');
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueTo).toBe(6500);
            expect(res[1].filter.termTo).toBe('6500');
        });
    });

    describe('When parse ranges with mileage makrer', function() {
        it('it should be parsed as mileage range', function () {
            var res = parser.parse('audi 20000 70000 km');

            expect(res[1].term).toBe('20000 - 70000');
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueFrom).toBe(20000);
            expect(res[1].filter.termFrom).toBe('20000');
            expect(res[1].filter.valueTo).toBe(70000);
            expect(res[1].filter.termTo).toBe('70000');
        });

        it('it should be parsed as two from mileage range', function () {
            var res = parser.parse('audi von 2000 km blub von 10000 km');

            expect(res[2].term).toBe('2000');
            expect(res[2].filter.type).toBe(_filterTypes.mileage);
            expect(res[2].filter.valueFrom).toBe(2000);
            expect(res[2].filter.termFrom).toBe('2000');
            expect(res[2].filter.valueTo).toBeUndefined();
            expect(res[2].filter.termTo).toBeUndefined();

            expect(res[6].term).toBe('10000');
            expect(res[6].filter.type).toBe(_filterTypes.mileage);
            expect(res[6].filter.valueFrom).toBe(10000);
            expect(res[6].filter.termFrom).toBe('10000');
            expect(res[6].filter.valueTo).toBeUndefined();
            expect(res[6].filter.termTo).toBeUndefined();
        });
    });
});
