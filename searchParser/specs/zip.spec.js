var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Zip tests single filter', function () {
    var underTest = require('../filters/zipFilter')();
    var filters = require('./specsHelper')().combineFilters(underTest);
    var parser = require('../parser')(filters);

    describe('When parse a suitable zip', function () {
        it('it recognize the zip', function () {
            var res = parser.parse('audi 85435');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('85435');
            expect(res[1].filter.type).toBe(_filterTypes.zip);
            expect(res[1].filter.value.lat).toBe('48.3099111578726');
            expect(res[1].filter.value.lon).toBe('11.9184400536846');
        });
    });
});

describe('Zip tests all filters', function () {
    var filters = require('../registerFilters')();
    var parser = require('../parser')(filters);

    describe('When parse a suitable zip', function () {
        it('it recognize the zip', function () {
            var res = parser.parse('audi 85435');

            expect(res.length).toBe(2);
            expect(res[1].term).toBe('85435');
            expect(res[1].filter.type).toBe(_filterTypes.zip);
            expect(res[1].filter.value.lat).toBe('48.3099111578726');
            expect(res[1].filter.value.lon).toBe('11.9184400536846');
        });
    });
});
