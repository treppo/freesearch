var _filterTypes = require('../statics/filterTypes').filterTypes;

var _maxFirstRegistration = new Date().getFullYear();
var _minFirstRegistration = 1910;

describe('First registration tests single filter', function () {
    var underTest = require('../filters/firstRegistrationFilter')().filter;
    var filters = require('./specsHelper')().combineFilters(underTest);
    var parser = require('../parser')(filters);

    describe('When parse a number in inside of suitable range', function () {
        it('it should parse it as first registration year', function () {
            var res = parser.parse('audi 2000');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000');
            expect(res[1].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as first registration year', function () {
            var res = parser.parse('audi ' + (_maxFirstRegistration + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.firstRegistration);
        });

        it('it should not be parsed as first registration year', function () {
            var res = parser.parse('audi ' + (_minFirstRegistration - 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.firstRegistration);
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a mileage ranges', function () {
            var res = parser.parse('von 2000 bis 2015');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2000 - 2015');
            expect(res[0].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBe(2015);
            expect(res[0].filter.termTo).toBe('2015');
        });

        it('and contains from, it should parse them as from mileage', function () {
            var res = parser.parse('von 2000');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2000');
            expect(res[0].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[0].filter.valueFrom).toBe(2000);
            expect(res[0].filter.termFrom).toBe('2000');
            expect(res[0].filter.valueTo).toBeUndefined();
            expect(res[0].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to mileage', function () {
            var res = parser.parse('bis 2000');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2000');
            expect(res[0].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueTo).toBe(2000);
            expect(res[0].filter.termTo).toBe('2000');
        });
    });
});

describe('First registration tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number outside of suitable range but the number is followed by a first registration marker', function () {
        it('it should NOT be parsed as first registration', function () {
            var expected = _maxFirstRegistration + 10;
            var res = parser.parse('audi ' +  expected + ' Erstzulassung');

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.firstRegistration);
        });
    });

    describe('When parse a number inside of suitable range and the number is followed by a first registration marker', function () {
        it('it should be parsed as first registration', function () {
            var expected = 2015;
            var res = parser.parse('audi ' +  expected + ' Erstzulassung');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('' + expected);
            expect(res[1].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[1].filter.valueFrom).toBe(expected);
            expect(res[1].filter.termFrom).toBe('' + expected);
        });
    });

    describe('When parse a number inside of suitable range and the number has a first registration marker preposition', function() {
        it('it should be parsed as first registration', function () {
            var res = parser.parse('audi Zulassung von 2000 bis 2014');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2000 - 2014');
            expect(res[1].filter.type).toBe(_filterTypes.firstRegistration);
            expect(res[1].filter.valueFrom).toBe(2000);
            expect(res[1].filter.termFrom).toBe('2000');
            expect(res[1].filter.valueTo).toBe(2014);
            expect(res[1].filter.termTo).toBe('2014');
        });
    });
});
