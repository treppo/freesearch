var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Geo Distance tests', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number followed by a distance marker', function () {
        it('it should not be parsed as distance', function () {
            var res = parser.parse('audi 100 km');
            expect(res[1].filter.type).not.toBe(_filterTypes.geoDistance);
        });
    });

    describe('When parse distance with zip oder city', function() {
        it('it should be parsed as distance', function () {
            var res = parser.parse('audi 85435 100 km');

            expect(res[2].term).toBe('100');
            expect(res[2].filter.type).toBe(_filterTypes.geoDistance);
            expect(res[2].filter.value).toBe(100);
            expect(res[2].filter.term).toBe('100');
        });

        it('it should be parsed as distance', function () {
            var res = parser.parse('audi 100 km erding');

            expect(res[1].term).toBe('100');
            expect(res[1].filter.type).toBe(_filterTypes.geoDistance);
            expect(res[1].filter.value).toBe(100);
            expect(res[1].filter.term).toBe('100');
        });
    });
});
