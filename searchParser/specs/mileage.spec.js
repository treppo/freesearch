var _filterTypes = require('../statics/filterTypes').filterTypes;
var _maxMileage = 1000000;

describe('Mileage tests single filter', function () {
    var underTest = require('../filters/mileageFilter')().filter;
    var filters = require('./specsHelper')().combineFilters(underTest);
    var parser = require('../parser')(filters);

    describe('When parse a number', function () {
        it('it should parse it as mileage', function () {
            var res = parser.parse('audi 20000');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('20000');
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueTo).toBe(20000);
            expect(res[1].filter.termTo).toBe('20000');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as mileage', function () {
            var res = parser.parse('audi ' + (_maxMileage + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.mileage);
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a mileage ranges', function () {
            var res = parser.parse('von 20000 bis 70000');

            expect(res[1].term).toBe('20000 - 70000');
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueFrom).toBe(20000);
            expect(res[1].filter.termFrom).toBe('20000');
            expect(res[1].filter.valueTo).toBe(70000);
            expect(res[1].filter.termTo).toBe('70000');
        });

        it('and contains from, it should parse them as from mileage', function () {
            var res = parser.parse('von 20000');

            expect(res[1].term).toBe('20000');
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueFrom).toBe(20000);
            expect(res[1].filter.termFrom).toBe('20000');
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to mileage', function () {
            var res = parser.parse('bis 20000');

            expect(res[1].term).toBe('20000');
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueFrom).toBeUndefined();
            expect(res[1].filter.termFrom).toBeUndefined();
            expect(res[1].filter.valueTo).toBe(20000);
            expect(res[1].filter.termTo).toBe('20000');
        });
    });
});

describe('Mileage tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number outside of suitable range but the number is followed by a mileage marker', function () {
        it('it should be parsed as mileage', function () {
            var expected = _maxMileage + 10;
            var res = parser.parse('audi ' + expected + 'km');

            expect(res[1].term).toBe('' + expected);
            expect(res[1].filter.type).toBe(_filterTypes.mileage);
            expect(res[1].filter.valueTo).toBe(expected);
            expect(res[1].filter.termTo).toBe('' + expected);
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
