var filters = require('../registeredFilters')();
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

describe('BodyType tests', function () {
    describe('when parse search line with body type', function () {
        it('it should parse to expected body type', function () {
            var res = _parser.parse('Audi blub cabrio');

            expect(res.length).toBe(3);
            expect(res[2].term).toBe('cabrio');
            expect(res[2].filter.term).toBe('Cabrio');
            expect(res[2].filter.type).toBe(_filterTypes.bodyType);
            expect(res[2].filter.value).toBe('2');
        });
    });

    describe('when parse search line with multiple body types', function () {
        it('it should parse to expected body types', function () {
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
