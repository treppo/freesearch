var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Geo Radius tests', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a number and city or zip info is missing', function () {
        it('it should not be parsed as radius', function () {
            var res = parser.parse('audi 100 km');
            expect(res[1].filter.type).not.toBe(_filterTypes.geoRadius);
        });
    });

    describe('When parse radius with zip oder city', function() {
        it('it should be parsed as radius', function () {
            var res = parser.parse('audi 85435 100 km');

            expect(res[2].term).toBe('100');
            expect(res[2].filter.type).toBe(_filterTypes.geoRadius);
            expect(res[2].filter.value).toBe(100);
            expect(res[2].filter.term).toBe('100');
        });

        it('it should be parsed as radius', function () {
            var res = parser.parse('audi 100 km erding');

            expect(res[1].term).toBe('100');
            expect(res[1].filter.type).toBe(_filterTypes.geoRadius);
            expect(res[1].filter.value).toBe(100);
            expect(res[1].filter.term).toBe('100');
        });
    });
});
