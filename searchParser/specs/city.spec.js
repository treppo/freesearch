var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('City tests single filter', function () {
    var underTest = require('../filters/cityFilter')();
    var filters = require('./specsHelper')().combineFilters(underTest);
    var parser = require('../parser')(filters);

    describe('When parse a city', function () {
        it('it recognize the city', function () {
            var res = parser.parse('audi erding');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('erding');
            expect(res[1].filter.type).toBe(_filterTypes.city);
            expect(res[1].filter.value.lat).toBe('48.2980807692307692');
            expect(res[1].filter.value.lon).toBe('11.9857346153846154');
        });
    });
});

describe('Zip tests all filters', function () {
    var filters = require('../registeredFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a city', function () {
        it('it recognize the city', function () {
            var res = parser.parse('audi erding');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('erding');
            expect(res[1].filter.type).toBe(_filterTypes.city);
            expect(res[1].filter.value.lat).toBe('48.2980807692307692');
            expect(res[1].filter.value.lon).toBe('11.9857346153846154');
        });
    });
});
