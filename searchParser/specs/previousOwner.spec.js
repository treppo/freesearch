var _filterTypes = require('../statics/filterTypes.js').filterTypes;

var _minPrevOwner = 1;
var _maxPrevOwner = 10;

describe('Previous owner tests single filter', function () {
    var underTest = require('../filters/previousOwnerFilter.js')().filter;
    var filters = require('./specsHelper.js')().combineFilters(underTest);
    var parser = require('../parser.js')(filters);

    describe('When parse a number', function () {
        it('it should parse it as previous owner', function () {
            var res = parser.parse('audi 3');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('3');
            expect(res[1].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[1].filter.valueFrom).toBe(3);
            expect(res[1].filter.termFrom).toBe('3');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as previous owner', function () {
            var res = parser.parse('audi ' + (_maxPrevOwner + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.prevOwner);
        });

        it('it should not be parsed as previous owner', function () {
            var res = parser.parse('audi ' + (_minPrevOwner - 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.prevOwner);
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a previous owner ranges', function () {
            var res = parser.parse('von 2 bis 3');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2 - 3');
            expect(res[0].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBe(3);
            expect(res[0].filter.termTo).toBe('3');
        });

        it('and contains from, it should parse them as from previous owner', function () {
            var res = parser.parse('von 2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBeUndefined();
            expect(res[0].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to previous owner', function () {
            var res = parser.parse('bis 2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueTo).toBe(2);
            expect(res[0].filter.termTo).toBe('2');
        });


        it('and contains only single value, it should be parsed as previous owner single value', function () {
            var res = parser.parse('1');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('1');
            expect(res[0].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[0].filter.valueFrom).toBe(1);
            expect(res[0].filter.termFrom).toBe('1');
            expect(res[0].filter.valueTo).toBe(1);
            expect(res[0].filter.termTo).toBe('1');
        });
    });
});

describe('Previous owner tests all filters', function () {
    var filters = require('../registeredFilters.js')();
    var parser = require('../parser.js')(filters);

    describe('When parse a number outside of suitable range but the number is followed by a previous owner marker', function () {
        it('it should be parsed as previous owner', function () {
            var expected = _maxPrevOwner + 10;
            var res = parser.parse('audi ' + expected + ' Hand');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('' + expected);
            expect(res[1].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[1].filter.valueFrom).toBe(expected);
            expect(res[1].filter.termFrom).toBe('' + expected);
        });
    });

    describe('When parse a suitable range followed by a previous owner marker', function () {
        it('it should be parsed as seat range', function () {
            var res = parser.parse('audi 2000 € von 2 bis 3 Halter');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('2 - 3');
            expect(res[2].filter.type).toBe(_filterTypes.prevOwner);
            expect(res[2].filter.valueFrom).toBe(2);
            expect(res[2].filter.termFrom).toBe('2');
            expect(res[2].filter.valueTo).toBe(3);
            expect(res[2].filter.termTo).toBe('3');
        });
    });
});
