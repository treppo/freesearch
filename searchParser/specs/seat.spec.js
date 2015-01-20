var _filterTypes = require('../statics/filterTypes.js').filterTypes;
var _maxSeats = 10;
var _minSeats = 1;

describe('Seat tests single filter', function () {
    var underTest = require('../filters/seatFilter.js')().filter;
    var filters = require('./specsHelper.js')().combineFilters(underTest);
    var parser = require('../parser.js')(filters);

    describe('When parse a number', function () {
        it('it should parse it as seat', function () {
            var res = parser.parse('audi 4');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('4');
            expect(res[1].filter.type).toBe(_filterTypes.seat);
            expect(res[1].filter.valueFrom).toBe(4);
            expect(res[1].filter.termFrom).toBe('4');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as seat', function () {
            var res = parser.parse('audi ' + (_maxSeats + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.seat);
        });

        it('it should not be parsed as seat', function () {
            var res = parser.parse('audi ' + (_minSeats - 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.seat);
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a seat ranges', function () {
            var res = parser.parse('von 2 bis 7');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2 - 7');
            expect(res[0].filter.type).toBe(_filterTypes.seat);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBe(7);
            expect(res[0].filter.termTo).toBe('7');
        });

        it('and contains from, it should parse them as from seat', function () {
            var res = parser.parse('von 2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.seat);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBeUndefined();
            expect(res[0].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to seat', function () {
            var res = parser.parse('bis 2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.seat);
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueTo).toBe(2);
            expect(res[0].filter.termTo).toBe('2');
        });
    });
});

describe('Seat tests all filters', function () {
    var filters = require('../registeredFilters.js')();
    var parser = require('../parser.js')(filters);

    describe('When parse a number outside of suitable range but the number is followed by a seat marker', function () {
        it('it should be parsed as seat', function () {
            var expected = _maxSeats + 10;
            var res = parser.parse('audi ' + expected + ' Sitze');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('' + expected);
            expect(res[1].filter.type).toBe(_filterTypes.seat);
            expect(res[1].filter.valueFrom).toBe(expected);
            expect(res[1].filter.termFrom).toBe('' + expected);
        });

        it('it should be parsed as seat range', function () {
            var res = parser.parse('audi 2 7 Sitze');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2 - 7');
            expect(res[1].filter.type).toBe(_filterTypes.seat);
            expect(res[1].filter.valueFrom).toBe(2);
            expect(res[1].filter.termFrom).toBe('2');
            expect(res[1].filter.valueTo).toBe(7);
            expect(res[1].filter.termTo).toBe('7');
        });
    });
});
