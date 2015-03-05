var _filterTypes = require('../statics/filterTypes').filterTypes;

var _minDoors  = 2;
var _maxDoors = 7;

describe('Door tests single filter', function () {
    var underTest = require('../filters/doorFilter')().filter;
    var filters = require('./specsHelper')().combineFilters(underTest);
    var parser = require('../parser')(filters);

    describe('When parse a number', function () {
        it('it should parse it as door', function () {
            var res = parser.parse('audi 4');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('4');
            expect(res[1].filter.type).toBe(_filterTypes.door);
            expect(res[1].filter.valueFrom).toBe(4);
            expect(res[1].filter.termFrom).toBe('4');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as door', function () {
            var res = parser.parse('audi ' + (_maxDoors + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.door);
        });

        it('it should not be parsed as door', function () {
            var res = parser.parse('audi ' + (_minDoors - 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.door);
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a door ranges', function () {
            var res = parser.parse('von 7 bis 2');

            expect(res[1].term).toBe('2 - 7');
            expect(res[1].filter.type).toBe(_filterTypes.door);
            expect(res[1].filter.valueFrom).toBe(2);
            expect(res[1].filter.termFrom).toBe('2');
            expect(res[1].filter.valueTo).toBe(7);
            expect(res[1].filter.termTo).toBe('7');
        });

        it('and contains from, it should parse them as from door', function () {
            var res = parser.parse('von 2');

            expect(res[1].term).toBe('2');
            expect(res[1].filter.type).toBe(_filterTypes.door);
            expect(res[1].filter.valueFrom).toBe(2);
            expect(res[1].filter.termFrom).toBe('2');
            expect(res[1].filter.valueTo).toBeUndefined();
            expect(res[1].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to door', function () {
            var res = parser.parse('bis 2');

            expect(res[1].term).toBe('2');
            expect(res[1].filter.type).toBe(_filterTypes.door);
            expect(res[1].filter.valueFrom).toBeUndefined();
            expect(res[1].filter.termFrom).toBeUndefined();
            expect(res[1].filter.valueTo).toBe(2);
            expect(res[1].filter.termTo).toBe('2');
        });


        it('and contains only single value, it should be parsed as door single value', function () {
            var res = parser.parse('2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.door);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBe(2);
            expect(res[0].filter.termTo).toBe('2');
        });
    });
});

describe('Door tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number outside of suitable range but the number is followed by a door marker', function () {
        it('it should be parsed as door', function () {
            var expected = _maxDoors + 10;
            var res = parser.parse('audi ' + expected + ' türer');

            expect(res[1].term).toBe('' + expected);
            expect(res[1].filter.type).toBe(_filterTypes.door);
            expect(res[1].filter.valueFrom).toBe(expected);
            expect(res[1].filter.termFrom).toBe('' + expected);
        });
    });

    describe('When parse a suitable range followed by a door marker', function () {
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
