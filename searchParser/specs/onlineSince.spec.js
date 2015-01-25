var _filterTypes = require('../statics/filterTypes.js').filterTypes;

var _minOnlineSince = 1;
var _maxOnlineSince = 14;

describe('OnlineSince tests single filter', function () {
    var underTest = require('../filters/onlineSinceFilter.js')().filter;
    var filters = require('./specsHelper.js')().combineFilters(underTest);
    var parser = require('../parser.js')(filters);

    describe('When parse a number', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi 3');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('3');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(3);
            expect(res[1].filter.termFrom).toBe('3');
        });
    });

    describe('When parse a number outside of suitable range', function () {
        it('it should not be parsed as OnlineSince', function () {
            var res = parser.parse('audi ' + (_maxOnlineSince + 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.onlineSince);
        });

        it('it should not be parsed as previous owner', function () {
            var res = parser.parse('audi ' + (_minOnlineSince - 1));

            expect(res.length).toBe(2);
            expect(res[1].filter.type).not.toBe(_filterTypes.onlineSince);
        });
    });

    describe('When parse with range markers', function () {
        it('and contains from and to, it should parse them as a OnlineSince ranges', function () {
            var res = parser.parse('seit 2 bis 3');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2 - 3');
            expect(res[0].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBe(3);
            expect(res[0].filter.termTo).toBe('3');
        });

        it('and contains from, it should parse them as from OnlineSince owner', function () {
            var res = parser.parse('seit 2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[0].filter.valueFrom).toBe(2);
            expect(res[0].filter.termFrom).toBe('2');
            expect(res[0].filter.valueTo).toBeUndefined();
            expect(res[0].filter.termTo).toBeUndefined();
        });

        it('and contains from, it should parse them as to OnlineSince', function () {
            var res = parser.parse('bis 2');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('2');
            expect(res[0].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[0].filter.valueFrom).toBeUndefined();
            expect(res[0].filter.termFrom).toBeUndefined();
            expect(res[0].filter.valueTo).toBe(2);
            expect(res[0].filter.termTo).toBe('2');
        });
    });
});

describe('Onlin since tests all filters', function () {
    var filters = require('../registeredFilters.js')();
    var parser = require('../parser.js')(filters);


    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi online seit 2');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(2);
            expect(res[1].filter.termFrom).toBe('2');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit gestern');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('gestern');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(1);
            expect(res[1].filter.termFrom).toBe('1');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit vorgestern');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('vorgestern');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(2);
            expect(res[1].filter.termFrom).toBe('2');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 1 woche');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('1');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(7);
            expect(res[1].filter.termFrom).toBe('7');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 2 wochen');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(14);
            expect(res[1].filter.termFrom).toBe('14');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 2 wochen');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('2');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(14);
            expect(res[1].filter.termFrom).toBe('14');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 10 Tagen');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('10');
            expect(res[1].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[1].filter.valueFrom).toBe(10);
            expect(res[1].filter.termFrom).toBe('10');
        });
    });
});
