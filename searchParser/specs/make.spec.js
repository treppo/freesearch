var filters = require('../registeredFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Make tests', function () {
    describe('when parse search line with one make', function () {
        it('it should parse to expected make', function () {
            var res = _parser.parse('BMW');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('BMW');
            expect(res[0].filter.term).toBe('BMW');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe('13');
        });

        it('it should parse to expected make', function () {
            var res = _parser.parse('Mercedes-Benz');

            expect(res.length).toBe(1);
            expect(res[0].term).toBe('Mercedes Benz');
            expect(res[0].filter.term).toBe('MercedesBenz');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe('47');
        });
    });

    describe('when parse search line with one make synonym', function () {
        it('it should parse to expected make', function () {
            var res = _parser.parse('vw mers bmw');

            expect(res.length).toBe(3);

            expect(res[0].term).toBe('vw');
            expect(res[0].filter.term).toBe('Volkswagen');
            expect(res[0].filter.type).toBe(_filterTypes.make);
            expect(res[0].filter.value).toBe('74');

            expect(res[1].term).toBe('mers');
            expect(res[1].filter.term).toBe('MercedesBenz');
            expect(res[1].filter.type).toBe(_filterTypes.make);
            expect(res[1].filter.value).toBe('47');

            expect(res[2].term).toBe('bmw');
            expect(res[2].filter.term).toBe('BMW');
            expect(res[2].filter.type).toBe(_filterTypes.make);
            expect(res[2].filter.value).toBe('13');
        });
    });
});
