var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Onlin since tests all filters', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi online seit 2');

            expect(res[3].term).toBe('2');
            expect(res[3].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[3].filter.valueFrom).toBe(2);
            expect(res[3].filter.termFrom).toBe('2');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit gestern');

            expect(res[2].term).toBe('gestern');
            expect(res[2].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[2].filter.valueFrom).toBe(1);
            expect(res[2].filter.termFrom).toBe('1');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit vorgestern');

            expect(res[2].term).toBe('vorgestern');
            expect(res[2].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[2].filter.valueFrom).toBe(2);
            expect(res[2].filter.termFrom).toBe('2');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 1 woche');

            expect(res[2].term).toBe('1');
            expect(res[2].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[2].filter.valueFrom).toBe(7);
            expect(res[2].filter.termFrom).toBe('7');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 2 wochen');

            expect(res[2].term).toBe('2');
            expect(res[2].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[2].filter.valueFrom).toBe(14);
            expect(res[2].filter.termFrom).toBe('14');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 2 wochen');

            expect(res[2].term).toBe('2');
            expect(res[2].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[2].filter.valueFrom).toBe(14);
            expect(res[2].filter.termFrom).toBe('14');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi seit 10 Tagen');

            expect(res[2].term).toBe('10');
            expect(res[2].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[2].filter.valueFrom).toBe(10);
            expect(res[2].filter.termFrom).toBe('10');
        });
    });

    describe('When parse a OnlineSince synonyms', function () {
        it('it should parse it as OnlineSince', function () {
            var res = parser.parse('audi eingestellt seit 4 Wochen');

            expect(res[3].term).toBe('4');
            expect(res[3].filter.type).toBe(_filterTypes.onlineSince);
            expect(res[3].filter.valueFrom).toBe(28);
            expect(res[3].filter.termFrom).toBe('28');
        });
    });
});
