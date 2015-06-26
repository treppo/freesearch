var filters = require('../registerFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('Color effect tests', function () {
    describe('when parse search line with color effect', function () {
        it('it should parse to expected color effect', function () {
            var res = _parser.parse('Audi blub metalic');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('metalic');
            expect(res[2].filter.term).toBe('Metallic');
            expect(res[2].filter.type).toBe(_filterTypes.colorEffect);
            expect(res[2].filter.value).toBe('M');
        });
    });
});