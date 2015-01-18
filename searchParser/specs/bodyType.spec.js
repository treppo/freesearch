var filters = require('../registeredFilters.js')();
var _parser = require('../parser.js')(filters);
var _filterTypes = require('../statics/filterTypes.js').filterTypes;

describe('BodyType tests', function () {
    describe('when parse search line with fuel', function () {
        it('it should parse to expected fuel type', function () {
            var res = _parser.parse('Audi blub cabrio');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('cabrio');
            expect(res[2].filter.term).toBe('Cabrio');
            expect(res[2].filter.type).toBe(_filterTypes.bodyType);
            expect(res[2].filter.value).toBe('2');
        });
    });

    describe('when parse search line with multiple fuel types', function () {
        it('it should parse to expected fuel types', function () {
            var res = _parser.parse('Audi blub cupe oder kleinwagen');

            expect(res.length).toBe(5);

            expect(res[2].term).toBe('cupe');
            expect(res[2].filter.term).toBe('Coupe');
            expect(res[2].filter.type).toBe(_filterTypes.bodyType);
            expect(res[2].filter.value).toBe('3');

            expect(res[4].term).toBe('kleinwagen');
            expect(res[4].filter.term).toBe('Compact');
            expect(res[4].filter.type).toBe(_filterTypes.bodyType);
            expect(res[4].filter.value).toBe('1');
        });
    });
});
